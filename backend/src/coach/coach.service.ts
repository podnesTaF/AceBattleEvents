import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoachDto } from './dto/create-coach-dto';
import { Coach } from './entities/coach.entity';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(Coach)
    private repository: Repository<Coach>,
  ) {}

  async create(dto: CreateCoachDto) {
    const coach = await this.repository.findOne({
      where: { name: dto.name, surname: dto.surname },
    });

    if (coach) {
      return coach;
    } else {
      return this.repository.save(dto);
    }
  }
}