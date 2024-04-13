import { Hashtag } from 'src/modules/hashtag/entities/hashtag.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class ArticleHashtag {
  @PrimaryColumn({ name: 'hashtag_id' })
  hashtagId: number;

  @PrimaryColumn({ name: 'article_id' })
  articleId: number;

  @ManyToOne(() => Hashtag, (hash) => hash.articles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'hashtag_id', referencedColumnName: 'id' }])
  hashtags: Hashtag[];

  @ManyToOne(() => Article, (artcile) => artcile.hashtags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'article_id', referencedColumnName: 'id' }])
  articles: Article[];
}
