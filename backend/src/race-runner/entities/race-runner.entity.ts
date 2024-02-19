import { RaceTeam } from 'src/race-team/entities/race-team.entity';
import { Race } from 'src/race/entities/race.entity';
import { Split } from 'src/split/entities/split.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RunnerRole } from './runner-role.entity';
import { RunnerStatus } from './runner-status.entity';

@Entity('race_runner')
export class RaceRunner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  runnerId: number;
  @ManyToOne(() => User, (user) => user.runnerForRaces, {
    onDelete: 'RESTRICT',
  })
  runner: User;

  @Column({ nullable: true })
  raceId: number;
  @ManyToOne(() => Race, (race) => race.raceRunners, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  race?: Race;

  @Column({ nullable: true })
  raceTeamId: number;
  @ManyToOne(() => RaceTeam, (raceTeam) => raceTeam.raceRunners, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'raceTeamId' })
  raceTeam?: RaceTeam;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ nullable: true })
  startNumber: string;

  @Column({ nullable: true, default: 1 })
  statusId: number;
  @ManyToOne(() => RunnerStatus, {
    onDelete: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn({ name: 'statusId' })
  status: RunnerStatus;

  @Column()
  runnerRoleId: number;
  @ManyToOne(() => RunnerRole, (runnerRole) => runnerRole.raceRunners)
  @JoinColumn({ name: 'runnerRoleId' })
  runnerRole: RunnerRole;

  @OneToMany(() => Split, (split) => split.raceRunner, { nullable: true })
  splits: Split[];
}
