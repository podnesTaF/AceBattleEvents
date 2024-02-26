import { Event } from 'src/modules/event/entities/event.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketPrice } from './ticket-price.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  volume: number;

  @Column()
  active: number;

  @OneToMany(() => TicketPrice, (price) => price.ticket)
  prices: TicketPrice[];

  @Column()
  eventId: number;
  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event;
}
