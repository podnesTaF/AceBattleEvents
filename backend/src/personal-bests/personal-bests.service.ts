import { Injectable } from '@nestjs/common';
import { CreatePersonalBestDto } from './dto/create-personal-best.dto';
import { UpdatePersonalBestDto } from './dto/update-personal-best.dto';

@Injectable()
export class PersonalBestsService {
  create(createPersonalBestDto: CreatePersonalBestDto) {
    return 'This action adds a new personalBest';
  }

  findAll() {
    return `This action returns all personalBests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalBest`;
  }

  update(id: number, updatePersonalBestDto: UpdatePersonalBestDto) {
    return `This action updates a #${id} personalBest`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalBest`;
  }
}
