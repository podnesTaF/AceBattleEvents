import { RunnerResult } from 'src/runner-results/entities/runner-results.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Split {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  distance: number;

  @Column({ nullable: true })
  splitType: string;

  @Column()
  resultInMs: number;

  @ManyToOne(() => RunnerResult, (results) => results.splits, {
    onDelete: 'CASCADE',
  })
  runnerResult: RunnerResult;
}
