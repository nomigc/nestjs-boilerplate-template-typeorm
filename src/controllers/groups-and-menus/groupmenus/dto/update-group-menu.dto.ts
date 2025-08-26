import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupMenuDto } from './create-group-menu.dto';

export class UpdateGroupMenuDto extends PartialType(CreateGroupMenuDto) {
  updatedById: number;
}
