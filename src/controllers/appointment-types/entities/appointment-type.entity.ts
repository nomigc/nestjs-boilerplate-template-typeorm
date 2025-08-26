import { BaseEntity } from '@/schemas/common';
import { AppointmentTypes } from '@/schemas/enums';
import { Column, Entity } from 'typeorm';

@Entity()
export class AppointmentType extends BaseEntity {
  @Column({ nullable: false })
  appointmentType: string;

  @Column({ nullable: false })
  colorCode: string;

  @Column({ type: 'enum', enum: AppointmentTypes, nullable: false })
  appointmentTypeFor: AppointmentTypes;

  @Column({ default: false })
  isDeleted: boolean;
}

export const APPOINTMENT_TYPE_MODEL: string = 'Appointment Type';
