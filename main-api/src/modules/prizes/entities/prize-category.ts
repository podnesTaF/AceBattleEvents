import { Event } from 'src/modules/event/entities/event.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrizeEntity } from './prize.entity';

@Entity()
export class PrizeCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PrizeEntity, (prize) => prize.category)
  prizes: PrizeEntity[];

  @ManyToOne(() => Event, (event) => event.prizeCategories, {
    onDelete: 'CASCADE',
  })
  event: Event;
}
