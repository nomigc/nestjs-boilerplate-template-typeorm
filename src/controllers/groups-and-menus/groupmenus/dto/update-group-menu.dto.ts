import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupMenuDto } from './create-group-menu.dto';

export class UpdateGroupMenuDto extends PartialType(CreateGroupMenuDto) {
  groupId: number;
  menuId: number;
  read: boolean;
  write: boolean;
  updatedById: number;
}
