import { Module } from '@nestjs/common';
import { AppointmentReasonService } from './appointment-reason.service';
import { AppointmentReasonController } from './appointment-reason.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentReason } from './entities';
import { AppointmentType } from '../appointment-types/entities';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentReason, AppointmentType])],
  controllers: [AppointmentReasonController],
  providers: [AppointmentReasonService],
})
export class AppointmentReasonModule {}
