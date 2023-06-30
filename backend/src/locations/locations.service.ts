import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/country/entity/country.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './entities/locations.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private repository: Repository<Location>,
  ) {}

  create(dto: CreateLocationDto, country: Country) {
    return this.repository.save({ ...dto, country });
  }

  findLocation(eventId: number) {
    return this.repository.findOne({ where: { id: eventId } });
  }
}
