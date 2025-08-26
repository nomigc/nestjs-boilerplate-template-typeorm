import { Controller, Post, Body, Req, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createResponse } from '@/utils';
import { USER_MODEL } from '@/schemas/common';
import { CreateAuthDto, LoginUserDto, newPasswordDto, ResetPasswordDto } from './dto';
import { Request } from 'express';
import { Response } from 'express';
import { AppConfigService } from '@/config/config.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly appConfigService: AppConfigService,
  ) {}

  @Post('register')
  async create(@Body() registerUserDto: CreateAuthDto) {
    const newUser = await this.authService.register(registerUserDto);
    return createResponse(`${USER_MODEL} created successfully`, newUser);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginUser = await this.authService.login(loginUserDto, res);

    return createResponse(`${USER_MODEL} logged in successfully`, loginUser);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: this.appConfigService.envCookieHttpOnly,
      secure: this.appConfigService.envCookieSecure,
      sameSite: 'none',
    });

    return createResponse(`${USER_MODEL} logged out successfully`, null);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const resetPassword = await this.authService.resetPassword(resetPasswordDto);

    return createResponse('Mail sent successfully', resetPassword);
  }

  @Put('new-password')
  async newPassword(@Body() newPasswordDto: newPasswordDto) {
    const newPassword = await this.authService.newPassword(newPasswordDto);

    return createResponse('Password updated successfully', null);
  }
}
