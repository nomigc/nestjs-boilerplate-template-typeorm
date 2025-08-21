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
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { createResponse } from '@/utils';
import { GROUP_MODEL } from './entities/group.entity';
import { JwtAuthGuard } from '@/common/guards';
import { CurrentUser } from '@/common/decorators';

@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto, @CurrentUser('id') userId: number) {
    const newGroup = await this.groupsService.create(createGroupDto, userId);

    return createResponse(`${GROUP_MODEL} created successfully`, newGroup);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const allGroups = await this.groupsService.findAll(page, limit);

    return createResponse(`${GROUP_MODEL} fetched successfully`, allGroups);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const singleGroup = await this.groupsService.findOne(id);

    return createResponse(`${GROUP_MODEL} fetched successfully`, singleGroup);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @CurrentUser('id') userId: number,
  ) {
    const updatedGroup = await this.groupsService.update(id, updateGroupDto, userId);

    return createResponse(`${GROUP_MODEL} updated successfully`, updatedGroup);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedGroup = await this.groupsService.delete(id);

    return createResponse(`${GROUP_MODEL} deleted successfully`, deletedGroup);
  }
}
