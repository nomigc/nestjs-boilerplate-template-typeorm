import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppointmentReasonService } from './appointment-reason.service';
import { CreateAppointmentReasonDto, UpdateAppointmentReasonDto } from './dto';
import { createResponse } from '@/utils';
import { APPOINTMENT_REASON_MODEL } from './entities/appointment-reason.entity';
import { JwtAuthGuard } from '@/common/guards';

@UseGuards(JwtAuthGuard)
@Controller('appointment-reason')
export class AppointmentReasonController {
  constructor(private readonly appointmentReasonService: AppointmentReasonService) {}

  @Post()
  async create(@Body() createAppointmentReasonDto: CreateAppointmentReasonDto) {
    const createAppointmentReason = await this.appointmentReasonService.create(
      createAppointmentReasonDto,
    );

    return createResponse(
      `${APPOINTMENT_REASON_MODEL} created successfully`,
      createAppointmentReason,
    );
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const allAppointmentReasons = await this.appointmentReasonService.findAll(page, limit);

    return createResponse(
      `${APPOINTMENT_REASON_MODEL} fetched successfully`,
      allAppointmentReasons,
    );
  }

  @Get('specialities-list')
  async specialities() {
    const specialities = await this.appointmentReasonService.specialities();

    return createResponse(`specialities fetched successfully`, specialities);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const singleAppointmentReason = await this.appointmentReasonService.findOne(id);

    return createResponse(
      `${APPOINTMENT_REASON_MODEL} fetched successfully`,
      singleAppointmentReason,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentReasonDto: UpdateAppointmentReasonDto,
  ) {
    const updatedAppointmentReason = await this.appointmentReasonService.update(
      id,
      updateAppointmentReasonDto,
    );

    return createResponse(
      `${APPOINTMENT_REASON_MODEL} updated successfully`,
      updatedAppointmentReason,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedAppointmentReason = await this.appointmentReasonService.delete(id);

    return createResponse(
      `${APPOINTMENT_REASON_MODEL} deleted successfully`,
      deletedAppointmentReason,
    );
  }
}
