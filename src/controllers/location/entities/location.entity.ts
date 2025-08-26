import { Practice } from '@/controllers/practice/entities';
import { BaseEntity } from '@/schemas/common';
import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';

@Entity()
export class Location extends BaseEntity {
  @Column()
  practiceId: number;

  @ManyToMany(() => Practice, (practice) => practice.id)
  @JoinColumn({ name: 'practiceId' })
  practice: Practice;

  @Column({ nullable: false })
  locationName: string;

  @Column({ nullable: true })
  billingName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  supportEmail: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zipNo: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  phoneTwo: string;

  @Column({ nullable: true })
  fax: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  web: string;

  @Column({ nullable: true })
  npi: string;

  @Column({ nullable: false })
  taxId: string;

  @Column({ nullable: true })
  medicarePtan: string;

  @Column({ nullable: true })
  cliaNo: string;

  @Column({ nullable: true })
  pathologyPrefix: string;

  @Column({ nullable: true })
  frozenSelectionPrefix: string;

  @Column({ nullable: true })
  patientLocationPrefix: string;

  @Column({ nullable: true })
  timeZone: string;

  @Column({ nullable: true })
  closingDate: Date;

  @Column({ nullable: true })
  BillerEmail: string;

  @Column({ nullable: true })
  BillerContact: string;

  @Column({ nullable: true })
  locationHeader: string;

  @Column({ nullable: true })
  locationFooter: string;
}

export const LOCATION_MODEL: string = Location.name;
