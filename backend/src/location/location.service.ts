import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { EditLocationDto } from './dto/edit-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async createLocation(dto: CreateLocationDto): Promise<Location> {
    return await this.locationRepository.save({
      ...dto,
    });
  }

  async updateLocation(
    id: number,
    dto: EditLocationDto,
  ): Promise<UpdateResult> {
    return await this.locationRepository.update(id, dto);
  }
}
