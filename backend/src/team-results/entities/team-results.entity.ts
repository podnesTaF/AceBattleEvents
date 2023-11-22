import { Race } from 'src/race/entities/race.entity';
import { RunnerResult } from 'src/runner-results/entities/runner-results.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TeamResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resultInMs: number;

  @ManyToOne(() => Race, (race) => race.teamResults, { onDelete: 'CASCADE' })
  race: Race;

  @ManyToOne(() => Team, (team) => team.results, { onDelete: 'CASCADE' })
  team: Team;

  @OneToMany(() => RunnerResult, (runnerResult) => runnerResult.teamResult, {
    onDelete: 'CASCADE',
  })
  runnerResults: RunnerResult[];
}