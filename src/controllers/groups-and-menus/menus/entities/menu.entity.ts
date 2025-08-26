import { BaseEntity } from '@/schemas/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Menu extends BaseEntity {
  @Column()
  title: string;

  @Column()
  path: string;

  @Column()
  subMenu: string;

  @Column({ default: false })
  isDeleted: boolean;
}

export const MENU_MODEL: string = Menu.name;
