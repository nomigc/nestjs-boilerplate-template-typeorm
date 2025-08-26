import { Group } from '@/controllers/groups-and-menus/groups/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false })
  realName: string;

  @Column({ nullable: false })
  initials: string; //* (i.e Nouman Sharif => NS)

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  age?: number;

  @Column({
    default: false,
  })
  isEmailVerified?: boolean;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @Column({
    default: false,
  })
  isActive: boolean;

  @Column({
    default: false,
  })
  isOTPon: boolean;

  @Column({
    nullable: true,
  })
  otp?: string;

  @Column({ nullable: false })
  groupId: number;

  @ManyToOne(() => Group, (group) => group.id, { nullable: false })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @Column({ nullable: true })
  mobileNumber?: string;
}

export const USER_MODEL: string = User.name;
