import { Injectable } from '@nestjs/common';
import { CreateGroupMenuDto } from './dto/create-group-menu.dto';
import { UpdateGroupMenuDto } from './dto/update-group-menu.dto';
import {
  createRepositoryHelper,
  deleteRepositoryHelper,
  existsRepositoryHelper,
  findAllRepositoryHelper,
  findOneRepositoryHelper,
  updateRepositoryHelper,
} from '@/common/helper/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMenu } from './entities';
import { Repository } from 'typeorm';
import { GROUP_MENU_MODEL } from './entities/group-menu.entity';
import { Group, GROUP_MODEL } from '../groups/entities/group.entity';
import { Menu } from '../menus/entities';
import { MENU_MODEL } from '../menus/entities/menu.entity';

@Injectable()
export class GroupMenusService {
  constructor(
    @InjectRepository(GroupMenu)
    private readonly groupMenuTypeOrmRepository: Repository<GroupMenu>,

    @InjectRepository(Group)
    private readonly groupTypeOrmRepository: Repository<Group>,

    @InjectRepository(Menu)
    private readonly menuTypeOrmRepository: Repository<Menu>,
  ) {}
  async create(createGroupMenuDto: CreateGroupMenuDto, userId: number) {
    const { groupId, menuId } = createGroupMenuDto;

    groupId
      ? await findOneRepositoryHelper(groupId, GROUP_MODEL, this.groupTypeOrmRepository)
      : null;

    menuId ? await findOneRepositoryHelper(menuId, MENU_MODEL, this.menuTypeOrmRepository) : null;

    createGroupMenuDto.createdById = userId;

    const newGroupMenu = await createRepositoryHelper(
      createGroupMenuDto,
      GROUP_MENU_MODEL,
      this.groupMenuTypeOrmRepository,
    );

    return newGroupMenu;
  }

  async findAll(page: string, limit: string) {
    const allGroupMenus = await findAllRepositoryHelper(
      page,
      limit,
      this.groupMenuTypeOrmRepository,
      GROUP_MENU_MODEL,
      undefined,
      undefined,
      {},
      ['group', 'menu'],
      [
        'group.id',
        'group.role',
        'group.description',
        'menu.id',
        'menu.title',
        'menu.path',
        'menu.subMenu',
      ],
    );

    return allGroupMenus;
  }

  async findOne(id: string) {
    const singleGroupMenu = await findOneRepositoryHelper(
      id,
      GROUP_MENU_MODEL,
      this.groupMenuTypeOrmRepository,
      ['group', 'menu'],
      [
        'group.id',
        'group.role',
        'group.description',
        'menu.id',
        'menu.title',
        'menu.path',
        'menu.subMenu',
      ],
    );

    return singleGroupMenu;
  }

  async update(id: string, updateGroupMenuDto: UpdateGroupMenuDto, userId: number) {
    const { groupId, menuId } = updateGroupMenuDto;

    groupId
      ? await findOneRepositoryHelper(groupId, GROUP_MODEL, this.groupTypeOrmRepository)
      : null;

    menuId ? await findOneRepositoryHelper(menuId, MENU_MODEL, this.menuTypeOrmRepository) : null;

    updateGroupMenuDto.updatedById = userId;

    const updatedGroupMenu = await updateRepositoryHelper(
      id,
      updateGroupMenuDto,
      GROUP_MENU_MODEL,
      this.groupMenuTypeOrmRepository,
    );

    return updatedGroupMenu;
  }

  async delete(id: string) {
    const deletedGroupMenu = await deleteRepositoryHelper(
      id,
      GROUP_MENU_MODEL,
      this.groupMenuTypeOrmRepository,
    );

    return deletedGroupMenu;
  }
}
