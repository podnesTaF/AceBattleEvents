import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventRaceType } from './event-race-type.entity';

@Entity('race_type')
export class RaceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => EventRaceType, (eventRaceType) => eventRaceType.raceType)
  eventRaceTypes: EventRaceType[];
}
