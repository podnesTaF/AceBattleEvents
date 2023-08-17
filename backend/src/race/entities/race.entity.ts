import { Event } from 'src/events/entities/event.entity';
import { TeamResult } from 'src/team-results/entities/team-results.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Race {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @ManyToMany(() => Team, (team) => team.races)
  @JoinTable()
  teams: Team[];

  @ManyToOne(() => Team, (team) => team.wonRaces, { nullable: true })
  winner: Team;

  @ManyToOne(() => Event, (event) => event.races)
  event: Event;

  @OneToMany(() => TeamResult, (teamResult) => teamResult.race)
  teamResults: TeamResult[];
}
