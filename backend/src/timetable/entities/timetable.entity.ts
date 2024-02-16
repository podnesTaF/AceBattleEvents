import { Event } from 'src/event/entities/event.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimetableRow } from './timetable-row.entity';

@Entity()
export class Timetable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  startTime: Date;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'datetime', nullable: true })
  validUntil?: Date;

  @Column({ default: true })
  active: boolean;

  @Column()
  eventId: number;

  @ManyToOne(() => Event, (event) => event.timetables)
  event: Event;

  @OneToMany(() => TimetableRow, (timetableRow) => timetableRow.timetable)
  rows: TimetableRow[];
}
