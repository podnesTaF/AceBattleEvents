import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDistanceDto } from '../dto/create-distance.dto';
import { Distance } from '../entities/distance.entity';

@Injectable()
export class DistanceService {
  constructor(
    @InjectRepository(Distance)
    private distanceRepository: Repository<Distance>,
  ) {}

  async createDistance(body: CreateDistanceDto): Promise<Distance> {
    const distance = this.distanceRepository.create(body);
    return await this.distanceRepository.save(distance);
  }

  async createDistances(body: CreateDistanceDto[]): Promise<Distance[]> {
    const distances = this.distanceRepository.create(body);
    return await this.distanceRepository.save(distances);
  }

  getDistancesDictionary() {
    return this.distanceRepository.find({ select: ['id', 'name'] });
  }
}
