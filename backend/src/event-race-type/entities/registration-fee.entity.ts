import { EventRaceRegistration } from 'src/event-race-registration/entities/event-race-registration.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventRaceType } from './event-race-type.entity';

@Entity('registration_fee')
export class RegistrationFee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventRaceTypeId: number;
  @ManyToOne(
    () => EventRaceType,
    (eventRaceType) => eventRaceType.registrationFees,
    { onDelete: 'CASCADE' },
  )
  eventRaceType: EventRaceType;

  @Column()
  amount: number;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  validUntil?: Date;

  @OneToMany(
    () => EventRaceRegistration,
    (eventRaceRegistration) => eventRaceRegistration.fee,
  )
  registrations: EventRaceRegistration[];
}
