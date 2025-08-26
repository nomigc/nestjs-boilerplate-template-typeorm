import { DeliverableEmailValidator } from '@/common/validators';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  IsDate,
  Validate,
} from 'class-validator';

export class CreateLocationDto {
  @IsNumber({}, { message: 'Practice id should be a number' })
  @IsNotEmpty({ message: 'Practice id is required' })
  practiceId: number;

  @IsString({ message: 'Location name should be a string' })
  @IsNotEmpty({ message: 'Location name is required' })
  locationName: string;

  @IsString({ message: 'Billing name should be a string' })
  @IsOptional()
  billingName?: string;

  @IsString({ message: 'Address should be a string' })
  @IsOptional()
  address?: string;

  @Validate(DeliverableEmailValidator)
  @IsEmail({}, { message: 'Support email is not valid' })
  @IsOptional()
  supportEmail?: string;

  @IsString({ message: 'City should be a string' })
  @IsOptional()
  city?: string;

  @IsString({ message: 'State should be a string' })
  @IsOptional()
  state?: string;

  @IsString({ message: 'Zip code should be a string' })
  @IsOptional()
  zipNo?: string;

  @IsString({ message: 'Phone should be a string' })
  @IsOptional()
  phone?: string;

  @IsString({ message: 'Phone should be a string' })
  @IsOptional()
  phoneTwo?: string;

  @IsString({ message: 'Fax should be a string' })
  @IsOptional()
  fax?: string;

  @Validate(DeliverableEmailValidator)
  @IsEmail({}, { message: 'Email is not valid' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Web should be a string' })
  @IsOptional()
  web?: string;

  @IsString({ message: 'NPI should be a string' })
  @IsOptional()
  npi?: string;

  @IsString({ message: 'Tax id should be a string' })
  @IsNotEmpty()
  taxId: string;

  @IsString({ message: 'Medicare ptan should be a string' })
  @IsOptional()
  medicarePtan?: string;

  @IsString({ message: 'CLIA no should be a string' })
  @IsOptional()
  cliaNo?: string;

  @IsString({ message: 'Pathology prefix should be a string' })
  @IsOptional()
  pathologyPrefix?: string;

  @IsString({ message: 'Frozen selection prefix should be a string' })
  @IsOptional()
  frozenSelectionPrefix?: string;

  @IsString({ message: 'Patient location prefix should be a string' })
  @IsOptional()
  patientLocationPrefix?: string;

  @IsString({ message: 'Time zone should be a string' })
  @IsOptional()
  timeZone?: string;

  @IsDate({ message: 'Opening date is not valid' })
  @Type(() => Date)
  @IsOptional()
  closingDate?: Date;

  @Validate(DeliverableEmailValidator)
  @IsEmail({}, { message: 'Biller email is not valid' })
  @IsOptional()
  BillerEmail?: string;

  @IsString({ message: 'Biller contact should be a string' })
  @IsOptional()
  BillerContact?: string;

  @IsString({ message: 'Location header should be a string' })
  @IsOptional()
  locationHeader?: string;

  @IsString({ message: 'Location footer should be a string' })
  @IsOptional()
  locationFooter?: string;
}
