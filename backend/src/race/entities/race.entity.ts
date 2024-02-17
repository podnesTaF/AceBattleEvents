import { EventRaceType } from 'src/event-race-type/entities/event-race-type.entity';
import { RaceRunner } from 'src/race-runner/entities/race-runner.entity';
import { RaceTeam } from 'src/race-team/entities/race-team.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Race {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'datetime', nullable: true })
  startTime: Date;

  @Column({ type: 'datetime', nullable: true })
  endTime: Date;

  @Column({ default: false })
  published: boolean;

  @Column({ default: false })
  finished: boolean;

  @Column()
  eventRaceTypeId: number;
  @ManyToOne(() => EventRaceType, (eventRaceType) => eventRaceType.races)
  eventRaceType: EventRaceType;

  @OneToMany(() => RaceRunner, (raceRunner) => raceRunner.race)
  raceRunners: RaceRunner[];

  @OneToMany(() => RaceTeam, (raceTeam) => raceTeam.race)
  raceTeams: RaceTeam[];
}
