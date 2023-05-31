import { LocationEntity } from 'src/locations/entities/locations.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  price: number;

  @OneToOne(() => LocationEntity)
  @JoinColumn()
  location: LocationEntity;
}
