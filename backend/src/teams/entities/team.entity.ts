import { Club } from 'src/club/entities/club.entity';
import { Coach } from 'src/coach/entities/coach.entity';
import { Country } from 'src/country/entity/country.entity';
import { Event } from 'src/events/entities/event.entity';
import { Media } from 'src/media/entities/media.entity';
import { Race } from 'src/race/entities/race.entity';
import { TeamResult } from 'src/team-results/entities/team-results.entity';
import { User } from 'src/user/entities/user.entity';
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

  @ManyToOne(() => Country, (country) => country.teams)
  country: Country;

  @ManyToOne(() => User, (user) => user.teams, { onDelete: 'CASCADE' })
  manager: User;

  @ManyToOne(() => Club, (club) => club.teams, { nullable: true })
  club: Club;

  @OneToOne(() => Coach, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  coach: Coach;

  @ManyToOne(() => Media, { nullable: true })
  @JoinColumn()
  logo: Media;

  @ManyToOne(() => Media, { nullable: true })
  @JoinColumn()
  teamImage: Media;

  @ManyToMany(() => User, (user) => user.teamsAsRunner, {
    onDelete: 'NO ACTION',
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
  players: User[];

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

  @OneToMany(() => Race, (race) => race.winner, { nullable: true })
  wonRaces: Race[];

  @OneToMany(() => TeamResult, (teamResult) => teamResult.team)
  results: TeamResult[];

  @ManyToMany(() => Race, (race) => race.teams)
  races: Race[];
}
