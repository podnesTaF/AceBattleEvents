import { Event } from 'src/event/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RaceType } from './race-type.entity';

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
}
