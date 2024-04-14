import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Timetable } from './timetable.entity';

@Entity()
export class TimetableRow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', nullable: true })
  callRoomTime: Date;

  @Column({ type: 'datetime' })
  startTime?: Date;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  teamMembers?: string;

  @Column()
  event: string;

  @Column()
  timetableId: number;

  @ManyToOne(() => Timetable, (timetable) => timetable.rows, {
    onDelete: 'CASCADE',
  })
  timetable: Timetable;
}
