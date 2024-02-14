import { Content } from 'src/content/entities/content.entity';
import { Hashtag } from 'src/hashtag/entities/hashtag.entity';
import {
  Column,
  Entity,
  ManyToMany,
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
}
