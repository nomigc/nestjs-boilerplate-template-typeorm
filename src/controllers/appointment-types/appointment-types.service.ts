import { Injectable } from '@nestjs/common';
import { AppointmentType } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createRepositoryHelper,
  deleteRepositoryHelper,
  existsRepositoryHelper,
  findAllRepositoryHelper,
  findOneRepositoryHelper,
  updateRepositoryHelper,
} from '@/common/helper/repositories';
import { APPOINTMENT_TYPE_MODEL } from './entities/appointment-type.entity';
import { CreateAppointmentTypeDto, UpdateAppointmentTypeDto } from './dto';

@Injectable()
export class AppointmentTypesService {
  constructor(
    @InjectRepository(AppointmentType)
    private readonly appointmentTypeOrmRepository: Repository<AppointmentType>,
  ) {}
  async create(createAppointmentTypeDto: CreateAppointmentTypeDto) {
    const { appointmentType } = createAppointmentTypeDto;

    appointmentType
      ? await findOneRepositoryHelper(
          appointmentType,
          APPOINTMENT_TYPE_MODEL,
          this.appointmentTypeOrmRepository,
        )
      : null;

    const createAppointmentType = await createRepositoryHelper(
      createAppointmentTypeDto,
      APPOINTMENT_TYPE_MODEL,
      this.appointmentTypeOrmRepository,
    );

    return createAppointmentType;
  }

  async findAll(page: string, limit: string) {
    const allAppointmentTypes = await findAllRepositoryHelper(
      page,
      limit,
      this.appointmentTypeOrmRepository,
      APPOINTMENT_TYPE_MODEL,
    );

    return allAppointmentTypes;
  }

  async findOne(id: string) {
    const singleAppointmentTypes = await findOneRepositoryHelper(
      id,
      APPOINTMENT_TYPE_MODEL,
      this.appointmentTypeOrmRepository,
    );

    return singleAppointmentTypes;
  }

  async update(id: string, updateAppointmentTypeDto: UpdateAppointmentTypeDto) {
    const { appointmentType } = updateAppointmentTypeDto;

    appointmentType
      ? await existsRepositoryHelper(
          appointmentType,
          'appointmentType',
          this.appointmentTypeOrmRepository,
          id,
        )
      : null;

    const updatedAppointmentType = await updateRepositoryHelper(
      id,
      updateAppointmentTypeDto,
      APPOINTMENT_TYPE_MODEL,
      this.appointmentTypeOrmRepository,
    );

    return updatedAppointmentType;
  }

  async delete(id: string) {
    const deletedAppointmentType = await deleteRepositoryHelper(
      id,
      APPOINTMENT_TYPE_MODEL,
      this.appointmentTypeOrmRepository,
    );

    return deletedAppointmentType;
  }
}
