import { EventRaceRegistration } from 'src/modules/event-race-registration/entities/event-race-registration.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Race } from 'src/modules/race/entities/race.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RaceType } from './race-type.entity';
import { RegistrationFee } from './registration-fee.entity';

@Entity('event_race_type')
export class EventRaceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventId: number;

  @Column()
  raceTypeId: number;

  @ManyToOne(() => Event, (event) => event.eventRaceTypes)
  event: Event;

  @ManyToOne(() => RaceType, (raceType) => raceType.eventRaceTypes)
  raceType: RaceType;

  @OneToMany(
    () => RegistrationFee,
    (registrationFee) => registrationFee.eventRaceType,
  )
  registrationFees: RegistrationFee[];

  @OneToMany(
    () => EventRaceRegistration,
    (eventRaceRegistration) => eventRaceRegistration.eventRaceType,
  )
  registrations: EventRaceRegistration[];

  @OneToMany(() => Race, (race) => race.eventRaceType)
  races: Race[];
}
