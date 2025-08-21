import { Group } from '@/controllers/groups-and-menus/groups/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  userName: string;

  @Column({ nullable: false })
  realName: string;

  @Column({ nullable: false })
  initials: string; //* (i.e Nouman Sharif => NS)

  @Column({ nullable: false, unique: true })
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

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

export const USER_MODEL: string = User.name;
