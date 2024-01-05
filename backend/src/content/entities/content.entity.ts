import { Event } from "src/events/entities/event.entity";
import { Media } from "src/media/entities/media.entity";
import { News } from "src/news/entities/news.entity";
import { NotificationEntity } from "src/notification/entities/notification.entity";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ default: "news" })
  purpose: string;

  @Column({ type: "text", nullable: true })
  text: string;

  @ManyToOne(() => Media, { nullable: true })
  media: Media;

  @ManyToOne(() => News, (news) => news.contents, {
    nullable: true,
    onDelete: "CASCADE",
  })
  news: News;

  @ManyToOne(() => Event, (event) => event.contents, {
    nullable: true,
    onDelete: "CASCADE",
  })
  event: Event;

  @ManyToMany(
    () => NotificationEntity,
    (notification) => notification.contents,
    {
      nullable: true,
    },
  )
  notifications: NotificationEntity[];
}
