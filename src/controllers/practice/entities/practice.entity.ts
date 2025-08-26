import { BaseEntity } from '@/schemas/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Practice extends BaseEntity {
  @Column({ nullable: false })
  practiceName: string;

  @Column({ nullable: true })
  alias: string;

  @Column({ nullable: true })
  npi: string;

  @Column({ nullable: true })
  license: string;

  @Column({ nullable: true })
  cliaNo: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  medicatePtan: string;

  @Column({ nullable: true })
  sessionTimeOut: number;

  @Column({ default: false })
  isMfaActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;
}

export const PRACTICE_MODEL: string = Practice.name;
