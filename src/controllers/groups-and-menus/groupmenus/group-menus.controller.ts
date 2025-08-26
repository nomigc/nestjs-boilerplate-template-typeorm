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
import { GroupMenusService } from './group-menus.service';
import { CreateGroupMenuDto, UpdateGroupMenuDto } from './dto';
import { createResponse } from '@/utils';
import { GROUP_MENU_MODEL } from './entities/group-menu.entity';
import { JwtAuthGuard } from '@/common/guards';
import { CurrentUser } from '@/common/decorators';

@UseGuards(JwtAuthGuard)
@Controller('groups-menus')
export class GroupMenusController {
  constructor(private readonly GroupMenusService: GroupMenusService) {}

  @Post()
  async create(@Body() createGroupMenuDto: CreateGroupMenuDto, @CurrentUser('id') userId: number) {
    const newGroupMenu = await this.GroupMenusService.create(createGroupMenuDto, userId);

    return createResponse(`${GROUP_MENU_MODEL} created successfully`, newGroupMenu);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const allGroupMenus = await this.GroupMenusService.findAll(page, limit);

    return createResponse(`${GROUP_MENU_MODEL} fetched successfully`, allGroupMenus);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const singleGroupMenu = await this.GroupMenusService.findOne(id);

    return createResponse(`${GROUP_MENU_MODEL} fetched successfully`, singleGroupMenu);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupMenuDto: UpdateGroupMenuDto,
    @CurrentUser('id') userId: number,
  ) {
    const updatedGroupMenu = await this.GroupMenusService.update(id, updateGroupMenuDto, userId);

    return createResponse(`${GROUP_MENU_MODEL} updated successfully`, updatedGroupMenu);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedGroupMenu = await this.GroupMenusService.delete(id);

    return createResponse(`${GROUP_MENU_MODEL} deleted successfully`, deletedGroupMenu);
  }
}
