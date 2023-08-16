import { Media } from 'src/media/entities/media.entity';
import { News } from 'src/news/entities/news.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @ManyToOne(() => Media, { nullable: true })
  media: Media;

  @ManyToOne(() => News, (news) => news.contents, { nullable: true })
  news: News;
}
