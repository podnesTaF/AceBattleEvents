import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/modules/content/entities/content.entity';
import { FileService } from 'src/modules/file/file.service';
import { Repository } from 'typeorm';
import { UpdateEventPreviewDto } from '../dto/event-preview.dto';
import { EventPreview } from '../entities/event-preview.entity';

@Injectable()
export class EventPreviewService {
  constructor(
    @InjectRepository(EventPreview)
    private readonly repository: Repository<EventPreview>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly fileService: FileService,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async create(event: Partial<EventPreview>) {
    return await this.repository.save(event);
  }

  async getAll(queries: { announced: boolean }) {
    if (queries.announced) {
      return {
        futureEvents: await this.repository.find({
          relations: ['contents', 'event'],
          where: { announced: true },
          order: { id: 'DESC' },
        }),
      };
    }
    const futureEvents = await this.repository.find({
      relations: ['contents', 'event'],
      order: { id: 'DESC' },
    });

    return { futureEvents };
  }

  async updateEventPreview(
    id: number,
    dto: UpdateEventPreviewDto & { introImage?: Express.Multer.File },
  ) {
    const eventPreview = await this.repository.findOne({ where: { id } });

    if (!eventPreview) {
      throw new Error('Event not found');
    }

    if (dto.introImage) {
      const url = await this.fileService.uploadFileToStorage(
        dto.introImage.originalname,
        'event-previews',
        dto.introImage.mimetype,
        dto.introImage.buffer,
        {
          mediaName: dto.introImage.originalname,
          contentType: dto.introImage.mimetype,
        },
      );

      eventPreview.introImageUrl = url;
    }

    const contents = dto.replaceContents ? [] : eventPreview.contents;
    if (dto.contents?.length) {
      for (const content of dto.contents) {
        const newContent = await this.contentRepository.save(content);
        contents.push(newContent);
      }
    }

    const { replaceContents, introImage, ...rest } = dto;

    return await this.repository.save({ ...eventPreview, ...rest, contents });
  }
}
