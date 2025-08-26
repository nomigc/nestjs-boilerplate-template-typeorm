import { Injectable } from '@nestjs/common';
import { CreateAppointmentReasonDto, UpdateAppointmentReasonDto } from './dto';
import {
  createRepositoryHelper,
  deleteRepositoryHelper,
  existsRepositoryHelper,
  findAllRepositoryHelper,
  findOneRepositoryHelper,
  updateRepositoryHelper,
} from '@/common/helper/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentReason, APPOINTMENT_REASON_MODEL } from './entities';
import { Repository } from 'typeorm';
import { AppointmentType, APPOINTMENT_TYPE_MODEL } from '../appointment-types/entities';

@Injectable()
export class AppointmentReasonService {
  constructor(
    @InjectRepository(AppointmentReason)
    private readonly appointmentReasonTypeOrmRepository: Repository<AppointmentReason>,

    @InjectRepository(AppointmentType)
    private readonly appointmentTypeOrmRepository: Repository<AppointmentType>,
  ) {}

  async create(createAppointmentReasonDto: CreateAppointmentReasonDto) {
    const { appointmentTypeId, reason } = createAppointmentReasonDto;

    appointmentTypeId
      ? await findOneRepositoryHelper(
          appointmentTypeId,
          APPOINTMENT_TYPE_MODEL,
          this.appointmentTypeOrmRepository,
        )
      : null;

    reason
      ? await existsRepositoryHelper(reason, 'reason', this.appointmentReasonTypeOrmRepository)
      : null;

    const createAppointmentReason = await createRepositoryHelper(
      createAppointmentReasonDto,
      APPOINTMENT_REASON_MODEL,
      this.appointmentReasonTypeOrmRepository,
    );

    return createAppointmentReason;
  }

  async findAll(page: string, limit: string) {
    const allAppointmentReasons = await findAllRepositoryHelper(
      page,
      limit,
      this.appointmentReasonTypeOrmRepository,
      APPOINTMENT_REASON_MODEL,
      undefined,
      undefined,
      {},
      ['appointmentType'],
      ['appointmentType.id', 'appointmentType.appointmentType', 'appointmentType.colorCode'],
    );

    return allAppointmentReasons;
  }

  async specialities() {
    return [
      'HOSPITAL',
      'ANESTHESIOLOGY',
      'FAMILY PRACTICE',
      'INTERNAL MEDICINE',
      'ALLERGY IMMUNOLOGY',
      'RHEUMATOLOGY',
      'CARDIOVASCULAR DISEASE',
      'DERMATOLOGY',
      'ENDOCRINOLOGY',
      'GASTROENTEROLOGY',
      'HEMATOLOGY',
      'INFECTIOUS DISEASES',
      'NEPHROLOGY',
      'NEUROLOGY',
      'PULMONARY',
      'OB-GYN',
      'OPHTHALMOLOGY',
      'OTOLARYNGOLOGY (ENT)',
      'PATHOLOGY',
      'PEDIATRICS',
      'PERIODONTICS',
      'PHYSICAL MEDICINE & REHABILITATION',
      'PSYCHIATRY',
      'RADIOLOGY',
      'GENERAL & VASCULAR SURGERY',
      'NEUROLOGICAL SURGERY',
      'ORAL SURGERY',
      'ORTHOPEDIC SURGERY',
      'PLASTIC & RECONSTRUCTIVE SURGERY',
      'THORACIC SURGERY',
      'UROLOGY',
      'PAIN MANAGEMENT',
      'PSYCHOLOGY',
      'PROCTOLOGY',
      'MEDICAL & SURGICAL SUPPLY',
      'DIALYSIS',
      'FREE-STANDING DIAGNOSTIC',
      'REHABILITATION',
      'GROUP PRACTICE',
      'OTHER NON-SPECIFIC',
      'PODIATRY',
      'HOME HEALTH',
      'REFERENCE LABORATORY',
      'OUTPATIENT SURGERY CENTER (Billing on UB/92)',
      'GENERAL SURGERY',
      'HAND SURGERY',
      'GLAUCOMA SPECIALIST',
      'GASTROINTESTINAL SURGERY',
      'PEDIATRIC OPTHALMOLOGY',
      'GERIATRICS',
      'NUCLEAR MEDICINE',
      'METABOLISM',
      'DIAGNOSTIC MEDICINE',
      'PEDIATRIC ALLERGY IMMUNOLOGY',
      'PEDIATRIC CARDIOLOGY',
      'PEDIATRIC DEVELOPMENTAL DISABILITY',
      'PEDIATRIC EMERGENCY MEDICINE',
      'PEDIATRIC ENDOCRINOLOGY',
      'PEDIATRIC GASTROENTEROLOGY',
      'MEDICAL GENETICS',
      'NEONATAL-PERINATAL MEDICINE',
      'PEDIATRIC INFECTIOUS DISEASE',
      'NEONATOLOGY',
      'PEDIATRIC NEPHROLOGY',
      'PEDIATRIC NEUROLOGY',
      'PEDIATRIC OTOLARYNGOLOGY',
      'PEDIATRIC PSYCHIATRY',
      'PEDIATRIC UTI & LEAD POISONING',
      'PEDIATRIC SURGERY',
      'PEDIATRIC CARDIOTHORACIC SURGERY',
      'AMBULANCE',
      'PEDIATRIC ORTHOPEDIC SURGERY',
      'PEDIATRIC PLASTIC & RECONSTRUCTIVE SURGERY',
      'PEDIATRIC UROLOGICAL SURGERY',
      'GERIATRIC SURGERY',
      'GENERAL PRACTICE',
      'CARDIOTHORACIC SURGERY',
      'GYNECOLOGY',
      'PEDIATRIC PSYCHOLOGY',
      'PEDIATRIC PULMONARY DISEASE',
      'COLON & RECTAL SURGERY',
      'EMERGENCY MEDICINE',
      'PEDIATRIC HEMATOLOGY & ONCOLOGY',
      'RADIATION ONCOLOGY',
      'DURABLE MEDICAL EQUIPMENT',
      'PHYSICAL THERAPY',
      'OPTOMETRIST',
      'DENTIST',
      'HOME INFUSION',
      'SPEECH THERAPY',
      'CLINIC',
      'CHEMICAL DEPENDENCY',
      'GYNECOLOGY INFERTILITY',
      'NURSING',
      'HOSPICE CARE',
      'PERINATOLOGY',
      'GYNECOLOGICAL ONCOLOGY',
      'VASCULAR SURGERY',
      'AUDIOLOGY',
      'CARDIAC ELECTROPHYSIOLOGY',
      'SOCIAL WORKER',
      'DIETITIAN',
      'HEAD & NECK SURGERY',
      'OCCUPATIONAL MEDICINE',
      'REGISTERED PSYCHIATRIC NURSE',
      'REPRODUCTIVE ENDOCRINOLOGY',
      'PREVENTIVE MEDICINE',
      'SKILLED NURSING FACILITY',
      'NURSING HOME',
      'PEDIATRIC RHEUMATOLOGY',
      'ELECTROPHYSIOLOGY',
      'PHARMACY',
      'MATERNAL/FETAL MEDICINE',
      'CARDIOVASCULAR SURGERY',
      'DIAGNOSTIC RADIOLOGY',
      'ALTERNATIVE MEDICINE',
      'PEDIATRIC ARTHRITIS & RHEUMATOLOGY',
      'CRITICAL CARE',
      'PEDIATRIC CRITICAL CARE',
      'ONCOLOGY',
      'ADOLESCENT MEDICINE',
      'MANIPULATIVE MEDICINE',
      'DERMATOPATHOLOGY',
      'SPECIALTY LABORATORIES',
      'ORTHOTICS/PROSTHETICS',
      'MOBILE MEDICAL SERVICES',
      'MEDICAL TOXICOLOGY',
      'BREAST PROSTHESIS & SUPPLIES',
      'OUTPATIENT SURGERY CENTER (Billing on HCFA-1500)',
      'PA/PAC',
      'AEROSPACE MEDICINE',
      'PROFESSIONAL COUNSELOR',
      'NURSE PRACTITIONER',
      'HOSPITALIST',
      'SLEEP MEDICINE',
      'HYPERBARIC MEDICINE',
      'PEDIATRIC NEUROSURGERY',
      'NURSE MIDWIFE',
      'SURGERY-CRITICAL CARE',
      'NEUROMUSKULOSKELETAL MEDICINE',
      'SPORTS MEDICINE',
      'MARITAL & FAMILY THERAPIST',
      'INTERVENTIONAL CARDIOLOGY',
      'CRNA',
      'SLEEP MEDICINE CENTER',
      'GERIATRIC PSYCHIATRY',
      'SPECIAL MATERNITY CARE',
      'URGENT CARE',
      'CHIROPRACTIC',
      'REHABILITATION HOSPITAL',
      'PHO',
      'NETWORKS',
      'HOSPITAL PHYSICIAN CHARGES',
      'MISCELLANEOUS PROVIDER',
      'All',
    ];
  }

  async findOne(id: string) {
    const singleAppointmentReason = await findOneRepositoryHelper(
      id,
      APPOINTMENT_REASON_MODEL,
      this.appointmentReasonTypeOrmRepository,
      ['appointmentType'],
      ['appointmentType.id', 'appointmentType.appointmentType', 'appointmentType.colorCode'],
    );

    return singleAppointmentReason;
  }

  async update(id: string, updateAppointmentReasonDto: UpdateAppointmentReasonDto) {
    const { appointmentTypeId, reason } = updateAppointmentReasonDto;

    appointmentTypeId
      ? await findOneRepositoryHelper(
          appointmentTypeId,
          APPOINTMENT_TYPE_MODEL,
          this.appointmentTypeOrmRepository,
        )
      : null;

    reason
      ? await existsRepositoryHelper(reason, 'reason', this.appointmentReasonTypeOrmRepository, id)
      : null;

    const updatedAppointmentReason = await updateRepositoryHelper(
      id,
      updateAppointmentReasonDto,
      APPOINTMENT_REASON_MODEL,
      this.appointmentReasonTypeOrmRepository,
    );

    return updatedAppointmentReason;
  }

  async delete(id: string) {
    const deletedAppointmentReason = await deleteRepositoryHelper(
      id,
      APPOINTMENT_REASON_MODEL,
      this.appointmentReasonTypeOrmRepository,
    );

    return deletedAppointmentReason;
  }
}
