import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Distance } from './distance.entity';

@Entity('best_result')
export class BestResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timeInMs: number;

  @ManyToOne(() => Distance, (distance) => distance.bestResults, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'distanceId' })
  distance: Distance;

  @Column()
  year: number;

  @Column({ default: 'personal best' })
  type: string;

  @ManyToOne(() => User, (runner) => runner.bestResults, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'runnerId' })
  runner: User;
}
