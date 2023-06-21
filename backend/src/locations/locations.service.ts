import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './entities/locations.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private repository: Repository<Location>,
  ) {}

  create(dto: CreateLocationDto) {
    return this.repository.save({ ...dto });
  }

  findLocation(eventId: number) {
    return this.repository.findOne({ where: { id: eventId } });
  }
}
