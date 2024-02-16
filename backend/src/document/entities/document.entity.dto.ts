import { Event } from 'src/event/entities/event.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  downloadUrl: string;

  @Column()
  eventId: number;

  @ManyToOne(() => Event, (event) => event.documents)
  @JoinColumn({ name: 'eventId' })
  event: Event;
}
