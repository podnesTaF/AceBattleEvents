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

  @Column({ nullable: true })
  runnerType: string;

  @ManyToOne(() => User, (user) => user.results, { nullable: true })
  runner: User;

  @ManyToOne(() => TeamResult, (teamResult) => teamResult.runnerResults, {
    onDelete: 'CASCADE',
  })
  teamResult: TeamResult;

  @OneToMany(() => Split, (split) => split.runnerResult, {
    onDelete: 'CASCADE',
  })
  splits: Split[];

  @ManyToOne(() => User, (user) => user.personalBests, { nullable: true })
  pbForRunner: User;
}
