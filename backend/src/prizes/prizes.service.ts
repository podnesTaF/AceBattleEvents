import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { PrizeEntity } from './entities/prize.entity';

@Injectable()
export class PrizesService {
  constructor(
    @InjectRepository(PrizeEntity)
    private repository: Repository<PrizeEntity>,
  ) {}

  create(createPrizeDto: CreatePrizeDto) {
    return this.repository.save(createPrizeDto);
  }
}