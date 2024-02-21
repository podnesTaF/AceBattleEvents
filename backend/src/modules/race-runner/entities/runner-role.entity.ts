import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RaceRunner } from './race-runner.entity';

@Entity('runner_role')
export class RunnerRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => RaceRunner, (raceRunner) => raceRunner.runnerRole)
  raceRunners: RaceRunner[];
}
