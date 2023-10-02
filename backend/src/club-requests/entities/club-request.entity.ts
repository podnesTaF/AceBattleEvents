import { Club } from 'src/club/entities/club.entity';
import { Runner } from 'src/users/entities/runner.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class JoinRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  motivation: string;

  @ManyToOne(() => Runner, (runner) => runner.joinRequests)
  runner: Runner;

  @ManyToOne(() => Club, (club) => club.joinRequests)
  club: Club;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
