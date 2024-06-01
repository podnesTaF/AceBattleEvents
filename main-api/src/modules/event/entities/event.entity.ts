import { Article } from "src/modules/article/entities/article.entity";
import { Content } from "src/modules/content/entities/content.entity";
import { Document } from "src/modules/document/entities/document.entity.dto";
import { EventRaceType } from "src/modules/event-race-type/entities/event-race-type.entity";
import { Location } from "src/modules/location/entities/location.entity";
import { Participant } from "src/modules/participant/entities/participant.entity";
import { PrizeCategory } from "src/modules/prizes/entities/prize-category";
import { Timetable } from "src/modules/timetable/entities/timetable.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EventType } from "./event-type.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  eventCode: string;

  @Column({ nullable: true })
  subtitle?: string;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true, type: "datetime" })
  startDateTime: Date;

  @Column()
  typeId: number;

  @ManyToOne(() => EventType, (eventType) => eventType.events)
  @JoinColumn({ name: "typeId" })
  type: EventType;

  @Column({ nullable: true })
  mainImageUrl: string;

  @Column({ nullable: true })
  introImageUrl: string;

  @Column({ nullable: true })
  locationId: number;

  @ManyToOne(() => Location, (location) => location.events, { nullable: true })
  @JoinColumn({ name: "locationId" })
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

  @Column({ type: "datetime", nullable: true })
  publishedAt: Date;

  @Column({ default: false })
  finished: boolean;

  @OneToMany(() => PrizeCategory, (cat) => cat.event, {
    onDelete: "CASCADE",
    nullable: true,
  })
  prizeCategories: PrizeCategory[];

  @OneToMany(() => EventRaceType, (eventRaceType) => eventRaceType.event)
  eventRaceTypes: EventRaceType[];

  @OneToMany(() => Participant, (participant) => participant.event)
  participants: Participant[];
}
