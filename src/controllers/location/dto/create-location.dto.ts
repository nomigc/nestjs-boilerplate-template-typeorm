import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty, IsNumber, IsEmail, IsDate } from 'class-validator';

export class CreateLocationDto {
  @IsNumber({}, { message: 'Practice id should be a number' })
  @IsNotEmpty({ message: 'Practice id is required' })
  practiceId: number;

  @IsString({ message: 'Location name should be a string' })
  @IsNotEmpty({ message: 'Location name is required' })
  locationName: string;

  @IsString()
  @IsOptional()
  billingName?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEmail()
  @IsOptional()
  supportEmail?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  zipNo?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  phoneTwo?: string;

  @IsString()
  @IsOptional()
  fax?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  web?: string;

  @IsString()
  @IsOptional()
  npi?: string;

  @IsString()
  @IsNotEmpty()
  taxId: string;

  @IsString()
  @IsOptional()
  medicarePtan?: string;

  @IsString()
  @IsOptional()
  cliaNo?: string;

  @IsString()
  @IsOptional()
  pathologyPrefix?: string;

  @IsString()
  @IsOptional()
  frozenSelectionPrefix?: string;

  @IsString()
  @IsOptional()
  patientLocationPrefix?: string;

  @IsString()
  @IsOptional()
  timeZone?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  closingDate?: Date;

  @IsEmail()
  @IsOptional()
  BillerEmail?: string;

  @IsString()
  @IsOptional()
  BillerContact?: string;

  @IsString()
  @IsOptional()
  locationHeader?: string;

  @IsString()
  @IsOptional()
  locationFooter?: string;
}
