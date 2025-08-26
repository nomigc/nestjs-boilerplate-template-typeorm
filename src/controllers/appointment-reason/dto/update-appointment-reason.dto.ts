import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentReasonDto } from './create-appointment-reason.dto';

export class UpdateAppointmentReasonDto extends PartialType(CreateAppointmentReasonDto) {}
