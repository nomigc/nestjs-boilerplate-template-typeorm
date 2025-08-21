import { PasswordComplexityValidator } from '@/common/validators';
import { IsNotEmpty, IsString, Validate } from 'class-validator';

export class newPasswordDto {
  @Validate(PasswordComplexityValidator)
  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsString({ message: 'Confirm password should be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  confirmPassword: string;

  @IsString({ message: 'Token should be a string' })
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}
