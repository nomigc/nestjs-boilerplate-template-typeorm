import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createResponse, CustomUnauthorizedException } from '@/utils';
import { USER_MODEL } from '@/schemas/common';
import { CreateAuthDto, LoginUserDto } from './dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() registerUserDto: CreateAuthDto) {
    const newUser = await this.authService.register(registerUserDto);
    return createResponse(`${USER_MODEL} created successfully`, newUser);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Req() req: Request) {
    const loginUser = await this.authService.login(loginUserDto);

    //* store sessions
    req.session.user = {
      id: loginUser.id,
      role: loginUser.role,
    };

    return createResponse(`${USER_MODEL} logged in successfully`, loginUser);
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    req.session.destroy((err: any) => {
      if (err) throw new CustomUnauthorizedException("Session doesn't exist.");
    });
    return createResponse(`${USER_MODEL} logged out successfully`, null);
  }
}
