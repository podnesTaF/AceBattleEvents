import { Article } from 'src/article/entities/article.entity';
import { Event } from 'src/event/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ default: 'article' })
  contentFor: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column()
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
}
