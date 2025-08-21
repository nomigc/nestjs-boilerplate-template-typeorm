import { Injectable } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import {
  createRepositoryHelper,
  deleteRepositoryHelper,
  existsRepositoryHelper,
  findAllRepositoryHelper,
  findOneRepositoryHelper,
  updateRepositoryHelper,
} from '@/common/helper/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Practice } from './entities';
import { Repository } from 'typeorm';
import { PRACTICE_MODEL } from './entities/practice.entity';

@Injectable()
export class PracticeService {
  constructor(
    @InjectRepository(Practice)
    private readonly practiceTypeOrmRepository: Repository<Practice>,
  ) {}
  async create(createPracticeDto: CreatePracticeDto) {
    const { practiceName } = createPracticeDto;

    practiceName
      ? await existsRepositoryHelper(practiceName, 'practiceName', this.practiceTypeOrmRepository)
      : null;

    const createPractice = await createRepositoryHelper(
      createPracticeDto,
      PRACTICE_MODEL,
      this.practiceTypeOrmRepository,
    );

    return createPractice;
  }

  async findAll(page: string, limit: string) {
    const allPractices = await findAllRepositoryHelper(
      page,
      limit,
      this.practiceTypeOrmRepository,
      PRACTICE_MODEL,
    );

    return allPractices;
  }

  async findOne(id: string) {
    const singlePractice = await findOneRepositoryHelper(
      id,
      PRACTICE_MODEL,
      this.practiceTypeOrmRepository,
    );

    return singlePractice;
  }

  async update(id: string, updatePracticeDto: UpdatePracticeDto) {
    const { practiceName } = updatePracticeDto;

    practiceName
      ? await existsRepositoryHelper(
          practiceName,
          'practiceName',
          this.practiceTypeOrmRepository,
          id,
        )
      : null;

    const updatedPractice = await updateRepositoryHelper(
      id,
      updatePracticeDto,
      PRACTICE_MODEL,
      this.practiceTypeOrmRepository,
    );

    return updatedPractice;
  }

  async delete(id: string) {
    const deletedPractice = await deleteRepositoryHelper(
      id,
      PRACTICE_MODEL,
      this.practiceTypeOrmRepository,
    );

    return deletedPractice;
  }
}
