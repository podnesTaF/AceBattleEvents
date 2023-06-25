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

  create(dto: CreateCoachDto) {
    return this.repository.save(dto);
  }
}
