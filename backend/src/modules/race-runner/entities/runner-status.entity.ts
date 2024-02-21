import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('runner_status')
export class RunnerStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
