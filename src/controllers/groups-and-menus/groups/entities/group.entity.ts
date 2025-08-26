import { BaseEntity, User } from '@/schemas/common';
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
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  role: string;

  @Column({ nullable: false })
  description: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdById: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdByUser: User;

  @Column({ nullable: true })
  updatedById: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedByUser: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

export const GROUP_MODEL: string = Group.name;
