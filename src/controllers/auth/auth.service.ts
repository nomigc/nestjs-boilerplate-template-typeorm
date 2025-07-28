import { Injectable } from '@nestjs/common';
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
} from '@/common/helper/repositories';
import { CreateAuthDto, LoginUserDto } from './dto';
import { AppConfigService } from '@/config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { MailService } from '../../mail/mail.service';
import { JwtCustomService } from '@/services/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly appConfigService: AppConfigService,
    private readonly mailService: MailService,
    private readonly jwtCustomService: JwtCustomService,

    @InjectRepository(User)
    private userTypeOrmRepository: Repository<User>,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { email, userName } = createAuthDto;

    userName
      ? await existsRepositoryHelper(
          userName,
          'userName',
          this.userTypeOrmRepository,
        )
      : null;

    const isUserExistWithEmail =
      await this.userRepository.findOneByEmail(email);
    if (isUserExistWithEmail) {
      throw new CustomConflictException('Email already exists');
    }

    if (createAuthDto.password !== createAuthDto.confirmPassword) {
      throw new CustomBadRequestException('Password does not match');
    }

    const hashPassword = await this.hashService.createHash(
      createAuthDto.password,
    );

    const newUser = { ...createAuthDto, password: hashPassword };
    const createdUser: any = await createRepositoryHelper(
      newUser as DeepPartial<User>,
      USER_MODEL,
      this.userTypeOrmRepository,
    );

    createdUser.password = null;

    return createdUser;
  }

  async login(loginUserDto: LoginUserDto) {
    const user: any = await this.userRepository.findOneByEmail(
      loginUserDto?.email,
    );
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
      await this.mailService.sendOtp(user.email, generateOtp());
      throw new CustomOKException('OTP sent successfully');
    }

    const { id, role } = user;
    const payload = { id, role };
    user.password = null;

    const access_token: Promise<string> = this.jwtCustomService.generateToken(
      payload,
      this.appConfigService.tokenExpiresIn,
    );

    return {
      ...user,
      access_token,
    };
  }
}
