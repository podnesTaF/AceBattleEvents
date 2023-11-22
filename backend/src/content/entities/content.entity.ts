import { Media } from "src/media/entities/media.entity";
import { News } from "src/news/entities/news.entity";
import { NotificationEntity } from "src/notification/entities/notification.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ type: "text", nullable: true })
  text: string;

  @ManyToOne(() => Media, { nullable: true })
  media: Media;

  @ManyToOne(() => News, (news) => news.contents, {
    nullable: true,
    onDelete: "CASCADE",
  })
  news: News;

  @ManyToOne(
    () => NotificationEntity,
    (notification) => notification.contents,
    {
      nullable: true,
      onDelete: "CASCADE",
    },
  )
  notification: NotificationEntity;
}