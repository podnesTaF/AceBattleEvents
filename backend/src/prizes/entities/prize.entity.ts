import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PrizeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  place: number;

  @Column()
  sum: number;

  @ManyToOne(() => Event, (event) => event.prizes)
  event: Event;
}
