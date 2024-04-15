import { User } from 'src/modules/users/entities/user.entity';
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
  distanceId: number;

  @Column({ nullable: true })
  year: number;

  @Column({ default: 'personal best' })
  type: string;

  @Column()
  runnerId: number;

  @ManyToOne(() => User, (runner) => runner.bestResults, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'runnerId' })
  runner: User;
}
