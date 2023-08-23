import { Event } from 'src/events/entities/event.entity';
import { News } from 'src/news/entities/news.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => News, (news) => news.hashtags, { nullable: true })
  news: News[];

  @ManyToMany(() => Event, (event) => event.hashtags, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  events: Event[];
}
