import { Content } from 'src/modules/content/entities/content.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Hashtag } from 'src/modules/hashtag/entities/hashtag.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  previewImageUrl: string;

  @Column({ default: false })
  active: boolean;

  @Column({ type: 'datetime' })
  publishedAt: Date;

  @Column({
    type: 'datetime',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.articles, {
    onDelete: 'SET NULL',
  })
  hashtags: Hashtag[];

  @OneToMany(() => Content, (content) => content.article)
  contents: Content[];

  @Column({ nullable: true })
  eventId: number;

  @ManyToOne(() => Event, (event) => event.articles, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  event: Event;
}
