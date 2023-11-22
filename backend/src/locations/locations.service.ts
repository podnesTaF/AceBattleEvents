import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { updateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/locations.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private repository: Repository<Location>,
    private readonly countryService: CountryService,
  ) {}

  create(dto: CreateLocationDto, country: Country) {
    return this.repository.save({ ...dto, country });
  }

  findLocation(eventId: number) {
    return this.repository.findOne({ where: { id: eventId } });
  }

  async updateLocation(id: number, body: updateLocationDto) {
    const location = await this.repository.findOne({
      where: { id },
      relations: ['country'],
    });

    let newCountry: Country;

    if (body.country) {
      const countryIfExist = await this.countryService.returnIfExist({
        name: body.country,
      });
      if (countryIfExist) {
        newCountry = countryIfExist;
      } else {
        newCountry = await this.countryService.create(body.country);
      }
    }

    location.address = body.address || location.address;
    location.city = body.city || location.city;
    location.country = newCountry || location.country;
    location.zipCode = body.zipCode || location.zipCode;

    return this.repository.save(location);
  }
}