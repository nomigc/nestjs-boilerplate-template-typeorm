import { DeliverableEmailValidator } from '@/common/validators';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';

export class LoginUserDto {
  @Validate(DeliverableEmailValidator)
  @IsEmail({}, { message: 'Email is not valid' })
  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsBoolean({ message: 'isOTPon should be a boolean' })
  @IsOptional()
  isOTPon?: boolean;
}
