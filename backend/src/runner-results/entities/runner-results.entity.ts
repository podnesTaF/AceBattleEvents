import { Split } from 'src/splits/entities/splits.entity';
import { TeamResult } from 'src/team-results/entities/team-results.entity';
import { User } from 'src/user/entities/user.entity';
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

  @Column()
  finalResultInMs: number;

  @ManyToOne(() => User, (user) => user.results, { nullable: true })
  runner: User;

  @ManyToOne(() => TeamResult, (teamResult) => teamResult.runnerResults)
  teamResult: TeamResult;

  @OneToMany(() => Split, (split) => split.runnerResult)
  splits: Split[];
}
