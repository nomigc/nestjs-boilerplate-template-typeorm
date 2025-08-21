import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { createResponse } from '@/utils';
import { LOCATION_MODEL } from './entities/location.entity';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    const createdLocation = await this.locationService.create(createLocationDto);

    return createResponse(`${LOCATION_MODEL} created successfully`, createdLocation);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const allLocations = await this.locationService.findAll(page, limit);

    return createResponse(`${LOCATION_MODEL} fetched successfully`, allLocations);
  }

  @Get('timezones')
  async timezones() {
    const timezones = await this.locationService.timezones();

    return createResponse('Timezones fetched successfully', timezones);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const singleLocation = await this.locationService.findOne(id);

    return createResponse(`${LOCATION_MODEL} fetched successfully`, singleLocation);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    const updatedLocation = await this.locationService.update(id, updateLocationDto);

    return createResponse(`${LOCATION_MODEL} updated successfully`, updatedLocation);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedLocation = await this.locationService.delete(id);

    return createResponse(`${LOCATION_MODEL} deleted successfully`, deletedLocation);
  }
}
