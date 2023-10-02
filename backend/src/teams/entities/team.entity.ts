import { Club } from 'src/club/entities/club.entity';
import { Coach } from 'src/coach/entities/coach.entity';
import { Country } from 'src/country/entity/country.entity';
import { Event } from 'src/events/entities/event.entity';
import { Media } from 'src/media/entities/media.entity';
import { Race } from 'src/race/entities/race.entity';
import { TeamResult } from 'src/team-results/entities/team-results.entity';
import { Manager } from 'src/users/entities/manager.entity';
import { Runner } from 'src/users/entities/runner.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  totalPoints: number;

  @Column({ default: 9999, nullable: true })
  rank: number;

  @ManyToOne(() => Country, (country) => country.teams)
  country: Country;

  @ManyToOne(() => Manager, (manager) => manager.teams, { onDelete: 'CASCADE' })
  manager: Manager;

  @ManyToOne(() => Club, (club) => club.teams, {
    nullable: true,
  })
  club: Club;

  @ManyToOne(() => Coach, (coach) => coach.teams)
  coach: Coach;

  @ManyToOne(() => Media, { nullable: true })
  @JoinColumn()
  logo: Media;

  @ManyToOne(() => Media, { nullable: true })
  @JoinColumn()
  teamImage: Media;

  @ManyToMany(() => Runner, (runner) => runner.teamsAsRunner, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'runner_for_team',
    joinColumn: {
      name: 'teamId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'runnerId',
      referencedColumnName: 'id',
    },
  })
  players: Runner[];

  @ManyToMany(() => Event, (event) => event.teams, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'team_for_event',
    joinColumn: {
      name: 'teamId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'eventId',
      referencedColumnName: 'id',
    },
  })
  events: Event[];

  @OneToMany(() => Race, (race) => race.winner, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  wonRaces: Race[];

  @OneToMany(() => TeamResult, (teamResult) => teamResult.team)
  results: TeamResult[];

  @ManyToMany(() => Race, (race) => race.teams)
  races: Race[];

  @OneToOne(() => TeamResult, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  personalBest: TeamResult;
}
