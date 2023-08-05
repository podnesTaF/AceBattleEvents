import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  create(createContentDto: CreateContentDto) {
    return 'This action adds a new content';
  }

  findAll() {
    return `This action returns all content`;
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
