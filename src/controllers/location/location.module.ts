import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities';
import { Practice } from '../practice/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Practice])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
