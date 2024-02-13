import { Distance } from 'src/best-results/entities/distance.entity';
import { Category } from 'src/category/entities/category.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('standard')
export class Standard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timeInMs: number;

  @ManyToOne(() => Distance, (distance) => distance.standards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'distanceId' })
  distance: Distance;

  @Column()
  distanceId: number;

  @ManyToOne(() => Category, (category) => category.standards, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: number;

  @ManyToOne(() => Gender, (gender) => gender.standards, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'genderId' })
  gender: Gender;

  @Column()
  genderId: number;
}
