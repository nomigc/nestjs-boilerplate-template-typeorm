import { Role } from '../enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true, unique: true })
  userName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  age?: number;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: true,
    default: Role.user,
  })
  role?: Role;

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
  isOTPon: boolean;

  @Column({
    nullable: true,
  })
  otp?: string;
}

export const USER_MODEL: string = User.name;
