import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entity/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private repository: Repository<Country>,
  ) {}

  async returnIfExist(query: any) {
    return this.repository.findOneOrFail({ where: { ...query } });
  }

  async create(country: string) {
    return this.repository.save({
      name: country,
      code: country.slice(0, 3).toUpperCase(),
    });
  }

  async findById(id: number) {
    return this.repository.findOne({ where: { id } });
  }
}
