import { Module } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { PracticeController } from './practice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Practice } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Practice])],
  controllers: [PracticeController],
  providers: [PracticeService],
})
export class PracticeModule {}
