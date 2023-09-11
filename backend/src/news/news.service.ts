import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentService } from 'src/content/content.service';
import { CreateHashtagDto } from 'src/hashtag/dto/create-hashtag.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { Repository } from 'typeorm';
import { CreateNewsDto, updateNewsDto } from './dto/create.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private repository: Repository<News>,
    private contentService: ContentService,
    private hashtagService: HashtagService,
  ) {}

  getNews() {
    return this.repository.find({
      relations: ['contents', 'hashtags', 'contents.media', 'mainImage'],
    });
  }

  async getNewsPreviews({
    relatedNews,
    itemsAmount,
    textLength,
  }: {
    relatedNews?: News[];
    itemsAmount?: number;
    textLength?: number;
  }) {
    const newsList = relatedNews ? relatedNews : await this.getNews();

    const newsPreviews = newsList.map((news) => {
      const content = news.contents.find((item) => item.type === 'text');
      const media = news.contents.find((item) => item.type === 'image')?.media;

      let previewText = '';
      if (content) {
        previewText =
          content.text.length > textLength || 80
            ? content.text.substring(0, textLength || 80) + '...'
            : content.text;
      }

      return {
        id: news.id,
        title: news.title,
        previewText: previewText,
        smallImageUrl: media ? media.smallUrl : '',
        createdAt: news.createdAt,
        mainImage: news.mainImage,
      };
    });

    return !isNaN(+itemsAmount)
      ? newsPreviews.slice(0, +itemsAmount)
      : newsPreviews;
  }

  async getNewsById(id: number) {
    const news = await this.repository.findOne({
      where: { id },
      relations: [
        'contents',
        'hashtags',
        'contents.media',
        'mainImage',
        'hashtags.news',
        'hashtags.news.contents',
        'hashtags.news.contents.media',
        // 'hashtags.events',
      ],
    });

    const relatedFullNews: {
      [key: number]: News;
    } = news.hashtags.reduce((acc, hashtag) => {
      return {
        ...acc,
        ...hashtag.news.reduce(
          (acc, news) => ({ ...acc, [news.id]: news }),
          {},
        ),
      };
    }, {});

    const relatedNews = await this.getNewsPreviews({
      relatedNews: Object.values(relatedFullNews).filter(
        (item) => item.id !== news.id,
      ),
    });

    news.hashtags = news.hashtags.map((hashtag) => ({
      id: hashtag.id,
      name: hashtag.name,
      news: null,
      events: null,
    }));

    return {
      ...news,
      relatedNews,
      // relatedEvents,
    };
  }

  async createNews(dto: CreateNewsDto) {
    const contents = [];
    const hashtags = [];

    const news = await this.repository.save({
      title: dto.title,
      mainImage: dto.mainImage,
    });

    for (const content of dto.contents) {
      const newContent = await this.contentService.create(
        { ...content },
        news.id,
      );
      contents.push(newContent);
    }

    for (const hashtag of dto.hashtags) {
      const hashtagClass = new CreateHashtagDto();
      hashtagClass.name = hashtag;
      const newHashtag = await this.hashtagService.create(hashtagClass);
      hashtags.push(newHashtag);
    }

    return this.repository.save({
      ...news,
      contents,
      hashtags,
    });
  }

  async updateNews(id: number, body: updateNewsDto) {
    const news = await this.repository.findOne({
      where: { id },
      relations: ['hashtags', 'contents'],
    });

    const newHashtags = [];
    for (const hashtag of body.hashtags) {
      if (!hashtag.id) {
        const newHashtag = await this.hashtagService.create({
          name: hashtag.name,
        });
        newHashtags.push(newHashtag);
      } else {
        newHashtags.push(hashtag);
      }
    }

    const newContents = [];

    for (const content of body.contents) {
      if (!content.id) {
        const newContent = await this.contentService.create(
          { ...content },
          news.id,
        );
        newContents.push(newContent);
      } else {
        newContents.push(content);
      }
    }

    news.hashtags = newHashtags;
    news.contents = newContents;
    news.title = body.title || news.title;
    news.mainImage = body.mainImage || news.mainImage;

    return this.repository.save(news);
  }

  deleteNews(id: number) {
    return this.repository.delete(id);
  }
}
