import { DeliverableEmailValidator } from '@/common/validators';
import { Validate } from 'class-validator';

export class ResetPasswordDto {
  @Validate(DeliverableEmailValidator)
  email: string;
}
