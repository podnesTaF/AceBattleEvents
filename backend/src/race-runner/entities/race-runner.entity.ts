import { Race } from 'src/race/entities/race.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column({ default: false })
  confirmed: boolean;

  @Column()
  startNumber: string;

  @Column({ nullable: true })
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
}
