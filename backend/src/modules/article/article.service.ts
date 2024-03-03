import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getNewsPreviews({
    relatedNews,
    page,
    limit,
    textLength,
    tags,
  }: {
    page?: number;
    relatedNews?: Article[];
    limit?: number;
    textLength?: number;
    tags?: string;
  }) {
    const hashtags: string[] | null =
      (tags?.split(',')[0] !== '' && tags?.split(',')) || null;

    const newsCount = await this.articleRepository.count();
    const newsList = relatedNews
      ? relatedNews
      : await this.getNews(limit, page, hashtags);

    const totalPages = Math.ceil(newsCount / (limit || newsCount));

    const newsPreviews = newsList.map((news) => {
      const content = news.contents.find((item) => item.type === 'text');
      const media = news.contents.find(
        (item) => item.type === 'image',
      )?.mediaUrl;

      let previewText = '';
      if (content) {
        previewText =
          content.text.length > (textLength || 90)
            ? content.text.substring(0, textLength || 90) + '...'
            : content.text;
      }

      return {
        id: news.id,
        title: news.title,
        previewText: previewText,
        smallImageUrl: media || '',
        createdAt: news.createdAt,
      };
    });

    return { newsPreviews, totalPages };
  }

  // Get all news
  getNews(limit?: number, page?: number, hashtags?: string[]) {
    return this.articleRepository.find({
      relations: ['contents'],
      take: limit,
      where: hashtags
        ? {
            hashtags: hashtags.map((hashtag) => ({ name: hashtag })),
          }
        : {},
      skip: page ? (page - 1) * limit : 0,
      order: { createdAt: 'DESC' },
    });
  }
}
