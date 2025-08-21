import { PartialType } from '@nestjs/mapped-types';
import { CreatePracticeDto } from './create-practice.dto';

export class UpdatePracticeDto extends PartialType(CreatePracticeDto) {
  practiceName: string;
  alias: string;
  npi: string;
  license: string;
  cliaNo: string;
  taxId: string;
  medicatePtan: string;
  sessionTimeOut: number;
  isMfaActive: boolean;
}
