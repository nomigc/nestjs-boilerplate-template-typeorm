import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentReasonDto {
  @IsNumber({}, { message: 'appointment Type should be a number' })
  @IsNotEmpty({ message: 'appointment Type is required' })
  appointmentTypeId: number;

  @IsString({ message: 'Speciality should be a string' })
  @IsNotEmpty({ message: 'Speciality is required' })
  speciality: string;

  @IsString({ message: 'Reason should be a string' })
  @IsNotEmpty({ message: 'Reason is required' })
  reason: string;

  @IsNumber({}, { message: 'appointment Length should be a number' })
  @IsNotEmpty({ message: 'appointment Length is required' })
  appointmentLength: number;

  @IsString({ message: 'cancellation Fee should be a string' })
  @IsNotEmpty({ message: 'cancellation Fee is required' })
  cancellationFee: string;
}
