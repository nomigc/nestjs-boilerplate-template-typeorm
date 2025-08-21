import { IsString, IsOptional, IsNumber, IsBoolean, IsNotEmpty, Min, Max } from 'class-validator';

export class CreatePracticeDto {
  @IsString({ message: 'Practice name must be a valid string' })
  @IsNotEmpty({ message: 'Practice name is required' })
  practiceName: string;

  @IsString({ message: 'Alias must be a valid string' })
  @IsOptional()
  alias?: string;

  @IsString({ message: 'NPI must be a valid string' })
  @IsOptional()
  npi?: string;

  @IsString({ message: 'License must be a valid string' })
  @IsOptional()
  license?: string;

  @IsString({ message: 'CLIA number must be a valid string' })
  @IsOptional()
  cliaNo?: string;

  @IsString({ message: 'Tax ID must be a valid string' })
  @IsOptional()
  taxId?: string;

  @IsString({ message: 'Medicare PTAN must be a valid string' })
  @IsOptional()
  medicatePtan?: string;

  @IsNumber({}, { message: 'Session timeout must be a valid number' })
  @Max(24, { message: 'Session timeout must be less than 24' })
  @Min(1, { message: 'Session timeout must be greater than 0' })
  @IsOptional()
  sessionTimeOut?: number;

  @IsBoolean({ message: 'MFA must be a valid boolean value' })
  @IsOptional()
  isMfaActive?: boolean;
}
