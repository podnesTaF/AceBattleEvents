import { Distance } from 'src/best-results/entities/distance.entity';
import { Category } from 'src/category/entities/category.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('standard')
export class Standard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timeInMs: number;

  @ManyToOne(() => Distance, (distance) => distance.standards, {
    onDelete: 'CASCADE',
  })
  distance: Distance;

  @ManyToOne(() => Category, (category) => category.standards, {
    onDelete: 'RESTRICT',
  })
  category: Category;

  @ManyToOne(() => Gender, (gender) => gender.standards, {
    onDelete: 'RESTRICT',
  })
  gender: Gender;
}
