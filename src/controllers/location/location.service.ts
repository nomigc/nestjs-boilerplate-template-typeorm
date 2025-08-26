import { Injectable } from '@nestjs/common';
import {
  createRepositoryHelper,
  deleteRepositoryHelper,
  existsRepositoryHelper,
  findAllRepositoryHelper,
  findOneRepositoryHelper,
  updateRepositoryHelper,
} from '@/common/helper/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location, LOCATION_MODEL } from './entities';
import { Practice, PRACTICE_MODEL } from '../practice/entities/practice.entity';
import { CreateLocationDto, UpdateLocationDto } from './dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationTypeOrmRepository: Repository<Location>,

    @InjectRepository(Practice)
    private readonly practiceTypeOrmRepository: Repository<Practice>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const { locationName, practiceId } = createLocationDto;

    locationName
      ? await existsRepositoryHelper(locationName, 'locationName', this.locationTypeOrmRepository)
      : null;

    practiceId
      ? await findOneRepositoryHelper(practiceId, PRACTICE_MODEL, this.practiceTypeOrmRepository)
      : null;

    const createLocation = await createRepositoryHelper(
      createLocationDto,
      LOCATION_MODEL,
      this.locationTypeOrmRepository,
    );

    return createLocation;
  }

  async findAll(page: string, limit: string) {
    const allLocations = await findAllRepositoryHelper(
      page,
      limit,
      this.locationTypeOrmRepository,
      LOCATION_MODEL,
    );

    return allLocations;
  }

  async findOne(id: string) {
    const singleLocation = await findOneRepositoryHelper(
      id,
      LOCATION_MODEL,
      this.locationTypeOrmRepository,
    );

    return singleLocation;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const { locationName, practiceId } = updateLocationDto;

    locationName
      ? await existsRepositoryHelper(
          locationName,
          'locationName',
          this.locationTypeOrmRepository,
          id,
        )
      : null;

    practiceId
      ? await findOneRepositoryHelper(practiceId, PRACTICE_MODEL, this.practiceTypeOrmRepository)
      : null;

    const updatedLocation = await updateRepositoryHelper(
      id,
      updateLocationDto,
      LOCATION_MODEL,
      this.locationTypeOrmRepository,
    );

    return updatedLocation;
  }

  async delete(id: string) {
    const deletedLocation = await deleteRepositoryHelper(
      id,
      LOCATION_MODEL,
      this.locationTypeOrmRepository,
    );

    return deletedLocation;
  }

  async timezones() {
    return [
      // pakistan time zone
      { label: '(UTC+05:00) Pakistan Standard Time', value: 'Asia/Karachi' },

      // usa time zones
      { label: '(UTC-12:00) Baker Island Time', value: 'Pacific/Baker' },
      { label: '(UTC-11:00) Samoa Standard Time', value: 'Pacific/Pago_Pago' },
      { label: '(UTC-10:00) Hawaii-Aleutian Standard Time (Honolulu)', value: 'Pacific/Honolulu' },
      { label: '(UTC-09:00) Alaska Standard Time (Anchorage)', value: 'America/Anchorage' },
      { label: '(UTC-09:00) Alaska Standard Time (Juneau)', value: 'America/Juneau' },
      { label: '(UTC-09:00) Alaska Standard Time (Nome)', value: 'America/Nome' },
      { label: '(UTC-09:00) Alaska Standard Time (Sitka)', value: 'America/Sitka' },
      { label: '(UTC-09:00) Alaska Standard Time (Yakutat)', value: 'America/Yakutat' },
      { label: '(UTC-08:00) Pacific Standard Time (Los Angeles)', value: 'America/Los_Angeles' },
      { label: '(UTC-08:00) Pacific Standard Time (Seattle)', value: 'America/Los_Angeles' },
      { label: '(UTC-08:00) Pacific Standard Time (San Francisco)', value: 'America/Los_Angeles' },
      { label: '(UTC-08:00) Pacific Standard Time (Portland)', value: 'America/Los_Angeles' },
      { label: '(UTC-08:00) Pacific Standard Time (Las Vegas)', value: 'America/Los_Angeles' },
      { label: '(UTC-07:00) Mountain Standard Time (Denver)', value: 'America/Denver' },
      { label: '(UTC-07:00) Mountain Standard Time (Phoenix)', value: 'America/Phoenix' },
      { label: '(UTC-07:00) Mountain Standard Time (Salt Lake City)', value: 'America/Denver' },
      { label: '(UTC-07:00) Mountain Standard Time (Albuquerque)', value: 'America/Denver' },
      { label: '(UTC-07:00) Mountain Standard Time (Boise)', value: 'America/Boise' },
      { label: '(UTC-06:00) Central Standard Time (Chicago)', value: 'America/Chicago' },
      { label: '(UTC-06:00) Central Standard Time (Dallas)', value: 'America/Chicago' },
      { label: '(UTC-06:00) Central Standard Time (Houston)', value: 'America/Chicago' },
      { label: '(UTC-06:00) Central Standard Time (New Orleans)', value: 'America/Chicago' },
      { label: '(UTC-06:00) Central Standard Time (Minneapolis)', value: 'America/Chicago' },
      { label: '(UTC-06:00) Central Standard Time (Kansas City)', value: 'America/Chicago' },
      {
        label: '(UTC-06:00) Central Standard Time (North Dakota)',
        value: 'America/North_Dakota/Center',
      },
      { label: '(UTC-05:00) Eastern Standard Time (New York)', value: 'America/New_York' },
      { label: '(UTC-05:00) Eastern Standard Time (Miami)', value: 'America/New_York' },
      { label: '(UTC-05:00) Eastern Standard Time (Atlanta)', value: 'America/New_York' },
      { label: '(UTC-05:00) Eastern Standard Time (Boston)', value: 'America/New_York' },
      { label: '(UTC-05:00) Eastern Standard Time (Washington DC)', value: 'America/New_York' },
      { label: '(UTC-05:00) Eastern Standard Time (Detroit)', value: 'America/Detroit' },
      {
        label: '(UTC-05:00) Eastern Standard Time (Louisville)',
        value: 'America/Kentucky/Louisville',
      },
      {
        label: '(UTC-05:00) Eastern Standard Time (Indianapolis)',
        value: 'America/Indiana/Indianapolis',
      },
      { label: '(UTC-04:00) Atlantic Standard Time (Puerto Rico)', value: 'America/Puerto_Rico' },
      {
        label: '(UTC-04:00) Atlantic Standard Time (US Virgin Islands)',
        value: 'America/St_Thomas',
      },

      // middle east time zones
      { label: '(UTC+02:00) Palestine Standard Time (Gaza)', value: 'Asia/Gaza' },
      { label: '(UTC+02:00) Palestine Standard Time (Hebron)', value: 'Asia/Hebron' },
      { label: '(UTC+03:00) Arabia Standard Time (Riyadh)', value: 'Asia/Riyadh' },
      { label: '(UTC+03:00) Qatar Standard Time (Doha)', value: 'Asia/Qatar' },
      { label: '(UTC+03:00) Kuwait Standard Time', value: 'Asia/Kuwait' },
      { label: '(UTC+03:00) Bahrain Standard Time (Bahrain)', value: 'Asia/Bahrain' },
      { label: '(UTC+03:00) Iraq Standard Time (Baghdad)', value: 'Asia/Baghdad' },
      { label: '(UTC+03:00) Jordan Standard Time (Amman)', value: 'Asia/Amman' },
      { label: '(UTC+03:00) Syria Standard Time (Damascus)', value: 'Asia/Damascus' },
      { label: '(UTC+03:00) Lebanon Standard Time (Beirut)', value: 'Asia/Beirut' },
      { label: '(UTC+03:00) Yemen Standard Time (Aden)', value: 'Asia/Aden' },
      { label: '(UTC+03:30) Iran Standard Time (Tehran)', value: 'Asia/Tehran' },
      { label: '(UTC+04:00) Gulf Standard Time (Dubai)', value: 'Asia/Dubai' },
      { label: '(UTC+04:00) Oman Standard Time (Muscat)', value: 'Asia/Muscat' },
    ];
  }
}
