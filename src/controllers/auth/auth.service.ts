import { Inject, Injectable, LoggerService, Res } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { User, USER_MODEL } from '@/schemas/common';
import {
  CustomBadRequestException,
  CustomConflictException,
  CustomOKException,
  generateOtp,
} from '@/utils';
import { HashService } from '@/services/hash/hash.service';
import {
  createRepositoryHelper,
  existsRepositoryHelper,
  findOneRepositoryHelper,
  updateRepositoryHelper,
} from '@/common/helper/repositories';
import { CreateAuthDto, LoginUserDto, newPasswordDto, ResetPasswordDto } from './dto';
import { AppConfigService } from '@/config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { MailService } from '../../mail/mail.service';
import { JwtCustomService } from '@/services/jwt/jwt.service';
import { Group, GROUP_MODEL } from '../groups-and-menus/groups/entities/group.entity';
import { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import validate from 'deep-email-validator';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly appConfigService: AppConfigService,
    private readonly mailService: MailService,
    private readonly jwtCustomService: JwtCustomService,

    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,

    @InjectRepository(User)
    private userTypeOrmRepository: Repository<User>,

    @InjectRepository(Group)
    private groupTypeOrmRepository: Repository<Group>,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { email, userName, groupId } = createAuthDto;

    userName
      ? await existsRepositoryHelper(userName, 'userName', this.userTypeOrmRepository)
      : null;

    groupId
      ? await findOneRepositoryHelper(groupId, GROUP_MODEL, this.groupTypeOrmRepository)
      : null;

    const isUserExistWithEmail = await this.userRepository.findOneByEmail(email);
    if (isUserExistWithEmail) {
      throw new CustomConflictException('Email already exists');
    }

    if (createAuthDto.password !== createAuthDto.confirmPassword) {
      throw new CustomBadRequestException('Password does not match');
    }

    const hashPassword = await this.hashService.createHash(createAuthDto.password);

    const newUser = { ...createAuthDto, password: hashPassword };
    const createdUser: any = await createRepositoryHelper(
      newUser as DeepPartial<User>,
      USER_MODEL,
      this.userTypeOrmRepository,
    );

    createdUser.password = null;

    this.logger.log('User created successfully', {
      context: 'AuthService',
      email: email,
      userName: userName,
    });

    return createdUser;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email } = loginUserDto;

    const user: any = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new CustomBadRequestException('Email is not valid');
    }

    const isMatch: boolean = await this.hashService.compareHash(
      loginUserDto?.password,
      user.password,
    );
    if (!isMatch) {
      throw new CustomBadRequestException('Password is not valid');
    }

    if (user.isOTPon) {
      await this.mailService.sendMail(user.email, 'Your request for otp', 'otp.template', {
        otp: generateOtp(),
      });
      throw new CustomOKException('OTP sent successfully');
    }

    const { id, role } = user;
    const payload = { id, role };
    user.password = null;

    const access_token: string = await this.jwtCustomService.generateToken(
      payload,
      this.appConfigService.tokenExpiresIn,
    );

    res.cookie('access_token', access_token, {
      httpOnly: this.appConfigService.envCookieHttpOnly,
      maxAge: 1000 * 60 * 60 * 24,
      secure: this.appConfigService.envCookieSecure,
      sameSite: this.appConfigService.envCookieSameSite,
    });

    this.logger.log('User logged in successfully', {
      context: 'AuthService',
      email: user.email,
      userName: user.userName,
    });

    return {
      ...user,
      access_token,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    let { email } = resetPasswordDto;

    const searchUserByEmail: any = await this.userRepository.findOneByEmail(email);
    if (!searchUserByEmail) {
      throw new CustomBadRequestException('Email is not valid');
    }

    const { id, role } = searchUserByEmail;
    const payload = { id, email, role };
    searchUserByEmail.password = null;

    const access_token: string = await this.jwtCustomService.generateToken(
      payload,
      this.appConfigService.tokenExpiresIn,
    );

    await this.mailService.sendMail(
      email,
      'You request for reset password',
      'reset-password.template',
      {
        link: `${this.appConfigService.clientPath}/auth/reset-password/${access_token}`,
      },
    );

    return {
      access_token,
    };
  }

  async newPassword(newPasswordDto: newPasswordDto) {
    const { password, confirmPassword, token } = newPasswordDto;

    const jwtToken: any = await this.jwtCustomService.validateToken(token);

    if (!jwtToken) {
      throw new CustomBadRequestException('Token is not valid or expired');
    }

    const { email, id } = jwtToken;

    const searchUserByEmail: any = await this.userRepository.findOneByEmail(email);
    if (!searchUserByEmail) {
      throw new CustomBadRequestException('Email is not valid');
    }

    if (password !== confirmPassword) {
      throw new CustomBadRequestException('Password does not match');
    }

    const hashPassword = await this.hashService.createHash(password);

    const updatedUser: any = await updateRepositoryHelper(
      id,
      { password: hashPassword },
      USER_MODEL,
      this.userTypeOrmRepository,
    );

    return updatedUser;
  }
}
