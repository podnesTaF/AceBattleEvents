import { Content } from 'src/modules/content/entities/content.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Hashtag } from 'src/modules/hashtag/entities/hashtag.entity';
import {
  Column,
  Entity,
  JoinTable,
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

  @Column({ type: 'datetime', nullable: true })
  publishedAt: Date;

  @Column({
    type: 'datetime',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.articles, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinTable({
    name: 'article_hashtag',
    joinColumn: {
      name: 'article_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'hashtag_id',
      referencedColumnName: 'id',
    },
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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
