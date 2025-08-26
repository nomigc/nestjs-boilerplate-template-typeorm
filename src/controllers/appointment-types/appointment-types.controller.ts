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
import { AppointmentTypesService } from './appointment-types.service';
import { createResponse } from '@/utils';
import { APPOINTMENT_TYPE_MODEL } from './entities/appointment-type.entity';
import { CreateAppointmentTypeDto, UpdateAppointmentTypeDto } from './dto';
import { JwtAuthGuard } from '@/common/guards';

@UseGuards(JwtAuthGuard)
@Controller('appointment-types')
export class AppointmentTypesController {
  constructor(private readonly appointmentTypesService: AppointmentTypesService) {}

  @Post()
  async create(@Body() createAppointmentTypeDto: CreateAppointmentTypeDto) {
    const createAppointmentType =
      await this.appointmentTypesService.create(createAppointmentTypeDto);

    return createResponse(`${APPOINTMENT_TYPE_MODEL} created successfully`, createAppointmentType);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const allAppointmentTypes = await this.appointmentTypesService.findAll(page, limit);

    return createResponse(`${APPOINTMENT_TYPE_MODEL} fetched successfully`, allAppointmentTypes);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const singleAppointmentType = await this.appointmentTypesService.findOne(id);

    return createResponse(`${APPOINTMENT_TYPE_MODEL} fetched successfully`, singleAppointmentType);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentTypeDto: UpdateAppointmentTypeDto,
  ) {
    const updatedAppointmentType = await this.appointmentTypesService.update(
      id,
      updateAppointmentTypeDto,
    );

    return createResponse(`${APPOINTMENT_TYPE_MODEL} updated successfully`, updatedAppointmentType);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedAppointmentType = await this.appointmentTypesService.delete(id);

    return createResponse(`${APPOINTMENT_TYPE_MODEL} deleted successfully`, deletedAppointmentType);
  }
}
