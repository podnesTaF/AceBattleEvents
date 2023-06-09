import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PrizeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  place: number;

  @Column()
  amount: number;

  @ManyToOne(() => Event, (event) => event.prizes, { onDelete: 'CASCADE' })
  event: Event;
}
