import { Injectable } from '@nestjs/common';
import {
  createRepositoryHelper,
  deleteRepositoryHelper,
  existsRepositoryHelper,
  findAllRepositoryHelper,
  findOneRepositoryHelper,
  updateRepositoryHelper,
} from '@/common/helper/repositories';
import { Group, GROUP_MODEL } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto, UpdateGroupDto } from './dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupTypeOrmRepository: Repository<Group>,
  ) {}
  async create(createGroupDto: CreateGroupDto, userId: number) {
    const { role } = createGroupDto;

    await existsRepositoryHelper(role, 'role', this.groupTypeOrmRepository);

    createGroupDto.createdById = userId;

    const newGroup = await createRepositoryHelper(
      createGroupDto,
      GROUP_MODEL,
      this.groupTypeOrmRepository,
    );

    return newGroup;
  }

  async findAll(page: string, limit: string) {
    const allGroups = await findAllRepositoryHelper(
      page,
      limit,
      this.groupTypeOrmRepository,
      GROUP_MODEL,
    );

    return allGroups;
  }

  findOne(id: string) {
    const singleGroup = findOneRepositoryHelper(id, GROUP_MODEL, this.groupTypeOrmRepository);

    return singleGroup;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto, userId: number) {
    const { role } = updateGroupDto;

    await existsRepositoryHelper(role, 'role', this.groupTypeOrmRepository, id);

    updateGroupDto.updatedById = userId;

    const updateGroup = updateRepositoryHelper(
      id,
      updateGroupDto,
      GROUP_MODEL,
      this.groupTypeOrmRepository,
    );

    return updateGroup;
  }

  delete(id: string) {
    const deletedGroup = deleteRepositoryHelper(id, GROUP_MODEL, this.groupTypeOrmRepository);

    return deletedGroup;
  }
}
