import { Article } from 'src/article/entities/article.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Article, (article) => article.hashtags, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  articles: Article[];

  // @ManyToMany(() => Event, (event) => event.hashtags, {
  //   nullable: true,
  //   onDelete: 'CASCADE',
  // })
  // events: Event[];
}
