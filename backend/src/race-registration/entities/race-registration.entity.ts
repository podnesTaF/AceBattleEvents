import { Race } from "src/race/entities/race.entity";
import { TeamRaceRunner } from "src/team-race-runner/entities/team-race-runner.entity";
import { Team } from "src/teams/entities/team.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class RaceRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: false,
  })
  checkedIn: boolean;

  @Column({
    default: false,
  })
  approved: boolean;

  @Column({
    nullable: true,
  })
  approvedAt: Date;

  @OneToMany(
    () => TeamRaceRunner,
    (teamRaceRunner) => teamRaceRunner.raceRegistration,
    {
      nullable: true,
    },
  )
  teamRaceRunners: TeamRaceRunner[];

  @ManyToOne(() => Race, (race) => race.teamRegistrations, {
    onDelete: "CASCADE",
  })
  race: Race;

  @ManyToOne(() => Team, (team) => team.raceRegistrations, {
    onDelete: "NO ACTION",
  })
  team: Team;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
