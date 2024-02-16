import { Article } from 'src/article/entities/article.entity';
import { Content } from 'src/content/entities/content.entity';
import { Document } from 'src/document/entities/document.entity.dto';
import { EventRaceType } from 'src/event-race-type/entities/event-race-type.entity';
import { Location } from 'src/location/entities/location.entity';
import { Timetable } from 'src/timetable/entities/timetable.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventType } from './event-type.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle?: string;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true, type: 'datetime' })
  startDateTime: Date;

  @Column()
  typeId: number;

  @ManyToOne(() => EventType, (eventType) => eventType.events)
  @JoinColumn({ name: 'typeId' })
  type: EventType;

  @Column({ nullable: true })
  mainImageUrl: string;

  @Column({ nullable: true })
  locationId: number;

  @ManyToOne(() => Location, (location) => location.events, { nullable: true })
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @OneToMany(() => Document, (document) => document.event)
  documents: Document[];

  @OneToMany(() => Timetable, (timetable) => timetable.event)
  timetables: Timetable[];

  @OneToMany(() => Content, (content) => content.event)
  contents: Content[];

  @OneToMany(() => Article, (article) => article.event)
  articles: Article[];

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'datetime', nullable: true })
  publishedAt: Date;

  @Column({ default: false })
  finished: boolean;

  @OneToMany(() => EventRaceType, (eventRaceType) => eventRaceType.event)
  eventRaceTypes: EventRaceType[];
}
