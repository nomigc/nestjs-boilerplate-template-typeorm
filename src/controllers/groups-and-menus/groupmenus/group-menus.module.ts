import { Module } from '@nestjs/common';
import { GroupMenusService } from './group-menus.service';
import { GroupMenusController } from './group-menus.controller';
import { GroupMenu } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../groups/entities';
import { Menu } from '../menus/entities';

@Module({
  imports: [TypeOrmModule.forFeature([GroupMenu, Group, Menu])],
  controllers: [GroupMenusController],
  providers: [GroupMenusService],
})
export class GroupMenusModule {}
