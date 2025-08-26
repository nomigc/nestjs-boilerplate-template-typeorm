import { Module } from '@nestjs/common';
import { AppointmentTypesService } from './appointment-types.service';
import { AppointmentTypesController } from './appointment-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentType } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentType])],
  controllers: [AppointmentTypesController],
  providers: [AppointmentTypesService],
})
export class AppointmentTypesModule {}
