import { Split } from 'src/splits/entities/splits.entity';
import { TeamResult } from 'src/team-results/entities/team-results.entity';
import { Runner } from 'src/users/entities/runner.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RunnerResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  distance: number;

  @Column({ nullable: true })
  finalResultInMs: number;

  @Column({ nullable: true })
  runnerType: string;

  @ManyToOne(() => Runner, (runner) => runner.results, { nullable: true })
  runner: Runner;

  @ManyToOne(() => TeamResult, (teamResult) => teamResult.runnerResults, {
    onDelete: 'CASCADE',
  })
  teamResult: TeamResult;

  @OneToMany(() => Split, (split) => split.runnerResult, {
    onDelete: 'CASCADE',
  })
  splits: Split[];

  @ManyToOne(() => Runner, (runner) => runner.personalBests, { nullable: true })
  pbForRunner: Runner;
}
