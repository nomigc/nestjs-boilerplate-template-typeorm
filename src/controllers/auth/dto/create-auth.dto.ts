import { DeliverableEmailValidator, PasswordComplexityValidator } from '@/common/validators';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from 'class-validator';

export class CreateAuthDto {
  @IsString({ message: 'Real name should be a string' })
  @IsNotEmpty({ message: 'Real name is required' })
  realName: string;

  @IsString({ message: 'User name should be a string' })
  @IsNotEmpty({ message: 'User name is required' })
  userName: string;

  @IsString({ message: 'Initials should be a string' })
  @IsNotEmpty({ message: 'Initials is required' })
  initials: string;

  @Validate(DeliverableEmailValidator)
  email: string;

  @Validate(PasswordComplexityValidator)
  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsString({ message: 'Confirm password should be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  confirmPassword: string;

  @IsNumber({}, { message: 'Age should be a number' })
  @IsOptional()
  age?: number;

  @IsNumber({}, { message: 'Group id should be a number' })
  @IsNotEmpty({ message: 'Group id is required' })
  groupId: number;

  @IsString({ message: 'Mobile number should be a string' })
  @IsOptional()
  mobileNumber?: string;
}
