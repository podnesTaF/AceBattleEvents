import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMediaDto } from './dto/createMedia.dto';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private repository: Repository<Media>,
  ) {}

  create(dto: CreateMediaDto) {
    console.log(dto);
    return this.repository.save(dto);
  }

  deleteByFileUrl(url: string) {
    return this.repository.delete({ mediaUrl: url });
  }

  findAll() {
    return this.repository.find();
  }

  findAllImages() {
    return this.repository.find({ where: { mediaType: 'image' } });
  }

  findByUrl(url: string) {
    return this.repository.findOne({ where: { mediaUrl: url } });
  }
}
