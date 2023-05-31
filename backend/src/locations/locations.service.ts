import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationEntity } from './entities/locations.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private repository: Repository<LocationEntity>,
  ) {}

  create(dto: CreateLocationDto) {
    return this.repository.save({ ...dto });
  }

  findLocation(eventId: number) {
    return this.repository.findOne({ where: { id: eventId } });
  }
}
