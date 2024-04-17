import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  validSince: Date;

  @Column({ type: 'timestamp', nullable: true })
  validUntil: Date;

  @Column()
  ticketId: number;
  @ManyToOne(() => Ticket, (ticket) => ticket.prices, { onDelete: 'CASCADE' })
  ticket: Ticket;
}
