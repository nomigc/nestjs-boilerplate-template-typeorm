import { AppointmentTypes } from '@/schemas/enums';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentTypeDto {
  @IsString({ message: 'Appointment type should be a string' })
  @IsNotEmpty({ message: 'Appointment type is required' })
  appointmentType: string;

  @IsString({ message: 'Color code should be a string' })
  @IsNotEmpty({ message: 'Color code is required' })
  colorCode: string;

  @IsEnum(AppointmentTypes, { message: 'Appointment type for is invalid' })
  @IsNotEmpty({ message: 'Appointment type for is required' })
  appointmentTypeFor: AppointmentTypes;
}
