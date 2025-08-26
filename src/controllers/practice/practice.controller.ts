import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PracticeService } from './practice.service';
import { createResponse } from '@/utils';
import { PRACTICE_MODEL } from './entities/practice.entity';
import { JwtAuthGuard } from '@/common/guards';
import { CreatePracticeDto, UpdatePracticeDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post()
  async create(@Body() createPracticeDto: CreatePracticeDto) {
    const newPractice = await this.practiceService.create(createPracticeDto);

    return createResponse(`${PRACTICE_MODEL} created successfully`, newPractice);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const allPractices = await this.practiceService.findAll(page, limit);

    return createResponse(`${PRACTICE_MODEL} fetched successfully`, allPractices);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const singlePractice = await this.practiceService.findOne(id);

    return createResponse(`${PRACTICE_MODEL} fetched successfully`, singlePractice);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePracticeDto: UpdatePracticeDto) {
    const updatedPractice = await this.practiceService.update(id, updatePracticeDto);

    return createResponse(`${PRACTICE_MODEL} updated successfully`, updatedPractice);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedPractice = await this.practiceService.delete(id);

    return createResponse(`${PRACTICE_MODEL} deleted successfully`, deletedPractice);
  }
}
