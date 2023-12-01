import { Event } from "src/events/entities/event.entity";
import { RaceRegistration } from "src/race-registration/entities/race-registration.entity";
import { TeamResult } from "src/team-results/entities/team-results.entity";
import { Team } from "src/teams/entities/team.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Race {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @Column()
  name: string;

  @Column({ default: "male" })
  type: string;

  // TO REMOVE
  @ManyToMany(() => Team, (team) => team.races, {
    nullable: true,
  })
  @JoinTable()
  teams: Team[];

  @OneToMany(
    () => RaceRegistration,
    (raceRegistration) => raceRegistration.race,
    {
      nullable: true,
    },
  )
  teamRegistrations: RaceRegistration[];

  @ManyToOne(() => Team, (team) => team.wonRaces, {
    nullable: true,
    onDelete: "CASCADE",
  })
  winner: Team;

  @ManyToOne(() => Event, (event) => event.races)
  event: Event;

  @OneToMany(() => TeamResult, (teamResult) => teamResult.race)
  teamResults: TeamResult[];
}
