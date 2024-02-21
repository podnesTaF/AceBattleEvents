import { User } from 'src/modules/users/entities/user.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('visitor_ticket')
export class VisitorTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticketId: number;
  @ManyToOne(() => Ticket, (ticket) => ticket.purchases)
  ticket: Ticket;

  @Column()
  userId: number;
  @OneToMany(() => User, (user) => user.visitorTickets)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  purchasedAt: Date;

  @Column()
  ticketPriceId: number;

  @Column({ nullable: true })
  couponId: number;
}
