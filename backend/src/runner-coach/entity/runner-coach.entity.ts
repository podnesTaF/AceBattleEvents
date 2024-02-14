import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('runner_coach')
export class RunnerCoach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  runnerId: number;

  @ManyToOne(() => User, (user) => user.runnerCoaches)
  @JoinColumn({ name: 'runnerId' })
  runner: User;

  @Column()
  coachId: number;

  @ManyToOne(() => User, (user) => user.coachRunners)
  @JoinColumn({ name: 'coachId' })
  coach: User;

  @Column()
  initiatorId: number;

  @ManyToOne(() => User, (user) => user.requestsInitiated)
  @JoinColumn({ name: 'initiatorId' })
  initiator: User;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  active: boolean;

  @Column({ type: 'datetime', nullable: true })
  diactivatedAt: Date;
}
