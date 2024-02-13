import { Standard } from 'src/standard/entities/standard.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BestResult } from './best-result.entity';

@Entity()
export class Distance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inCm: number;

  @OneToMany(() => BestResult, (bestResult) => bestResult.distance)
  bestResults: BestResult[];

  @OneToMany(() => Standard, (standard) => standard.distance)
  standards: Standard[];
}
