import { Article } from 'src/modules/article/entities/article.entity';
import { EventPreview } from 'src/modules/event/entities/event-preview.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ default: 'article' })
  purpose: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({
    nullable: true,
  })
  mediaUrl: string;

  @Column({ nullable: true })
  articleId: number;

  @ManyToOne(() => Article, (article) => article.contents, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  article: Article;

  @Column({
    nullable: true,
  })
  eventId: number;

  @ManyToOne(() => Event, (event) => event.contents, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  event: Event;

  @Column({
    nullable: true,
  })
  eventPreviewId: number;

  @ManyToOne(() => EventPreview, (preview) => preview.contents, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  eventPreview: EventPreview;
}
