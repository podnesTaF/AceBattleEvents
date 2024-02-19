import { RaceRunner } from 'src/race-runner/entities/race-runner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Split {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  raceRunnerId: number;
  @ManyToOne(() => RaceRunner, (raceRunner) => raceRunner.splits, {
    onDelete: 'RESTRICT',
  })
  raceRunner: RaceRunner;

  @Column()
  distanceInCm: number;

  @Column()
  resultInMs: number;

  @Column({ default: false })
  finalSplit: boolean;

  @Column({ default: false })
  firstSplit: boolean;
}
