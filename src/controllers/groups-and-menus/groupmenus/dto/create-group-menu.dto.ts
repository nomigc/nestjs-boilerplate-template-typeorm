import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateGroupMenuDto {
  @IsNumber({}, { message: 'Group should be a number' })
  @IsNotEmpty({ message: 'Group is required' })
  groupId: number;

  @IsNumber({}, { message: 'Menu should be a number' })
  @IsNotEmpty({ message: 'Menu is required' })
  menuId: number;

  @IsBoolean({ message: 'Read should be a boolean' })
  @IsNotEmpty({ message: 'Read is required' })
  read: boolean;

  @IsBoolean({ message: 'Write should be a boolean' })
  @IsNotEmpty({ message: 'Write is required' })
  write: boolean;

  @IsNumber({}, { message: 'Created by id should be a number' })
  @IsOptional()
  createdById?: number;
}
