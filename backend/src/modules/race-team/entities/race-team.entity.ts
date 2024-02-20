import { Penalty } from 'src/modules/penalty/entities/penalty.entity';
import { RaceRunner } from 'src/modules/race-runner/entities/race-runner.entity';
import { Race } from 'src/modules/race/entities/race.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('race_team')
export class RaceTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamId: number;
  @ManyToOne(() => Team, (team) => team.teamRaces, {
    onDelete: 'RESTRICT',
  })
  team: Team;

  @Column()
  raceId: number;
  @ManyToOne(() => Race, (race) => race.raceTeams, {
    onDelete: 'RESTRICT',
  })
  race: Race;

  @OneToMany(() => RaceRunner, (raceRunner) => raceRunner.raceTeam)
  raceRunners: RaceRunner[];

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false })
  finished: boolean;

  @Column({ nullable: true })
  won: boolean;

  @Column({ nullable: true })
  totalTimeInMs: number;

  @ManyToMany(() => Penalty, (penalty) => penalty.raceTeams)
  penalties: Penalty[];
}
