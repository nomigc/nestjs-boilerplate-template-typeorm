import { AppointmentType } from '@/controllers/appointment-types/entities';
import { BaseEntity } from '@/schemas/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class AppointmentReason extends BaseEntity {
  @Column({ nullable: false })
  appointmentTypeId: number;

  @ManyToOne(() => AppointmentType, (appointmentType) => appointmentType.id)
  @JoinColumn({ name: 'appointmentTypeId' })
  appointmentType: AppointmentType;

  @Column({ nullable: false })
  speciality: string;

  @Column({ nullable: false })
  reason: string;

  @Column('float', { nullable: false })
  appointmentLength: number;

  @Column({ nullable: false })
  cancellationFee: string;

  @Column({ default: false })
  isDeleted: boolean;
}

export const APPOINTMENT_REASON_MODEL: string = 'Appointment Reason';
