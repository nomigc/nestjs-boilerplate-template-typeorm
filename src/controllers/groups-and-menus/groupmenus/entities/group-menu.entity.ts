import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '../../groups/entities';
import { Menu } from '../../menus/entities';
import { User } from '@/schemas/common';

@Entity()
export class GroupMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @ManyToOne(() => Group, (group) => group.id, { nullable: false })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @Column()
  menuId: number;

  @ManyToOne(() => Menu, (menu) => menu.id, { nullable: false })
  @JoinColumn({ name: 'menuId' })
  menu: Menu;

  @Column({ default: false })
  read: boolean;

  @Column({ default: false })
  write: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdById: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'createdById' })
  createdByUser: User;

  @Column({ nullable: true })
  updatedById: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'updatedById' })
  updatedByUser: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

export const GROUP_MENU_MODEL: string = GroupMenu.name;
