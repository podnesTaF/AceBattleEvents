import { Content } from 'src/content/entities/content.entity';
import { Hashtag } from 'src/hashtag/entities/hashtag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.news)
  @JoinTable()
  hashtags: Hashtag[];

  @OneToMany(() => Content, (content) => content.news, { onDelete: 'CASCADE' })
  contents: Content[];
}
