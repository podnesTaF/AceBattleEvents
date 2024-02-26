import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './entity/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private repository: Repository<Country>,
  ) {}

  async createManyCountries(countries: CreateCountryDto[]): Promise<Country[]> {
    const countriesToSave = countries.map((country) => {
      return this.repository.create(country);
    });

    return this.repository.save(countriesToSave);
  }

  async returnIfExist(query: any) {
    const country = await this.repository.findOne({ where: { ...query } });

    return country || null;
  }

  async create(country: string) {
    let flagUrl: string | null = null;
    try {
      const { data } = await axios.get(
        'https://restcountries.com/v3.1/name/' + country + '?fields=flags',
      );

      if (data?.[0]?.flags?.svg) {
        flagUrl = data[0].flags.svg;
      }
    } catch (error) {
      flagUrl = null;
    }
    return this.repository.save({
      name: country,
      code: country.slice(0, 3).toUpperCase(),
      flagIconUrl: flagUrl,
    });
  }

  async findById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  getAllNames() {
    return this.repository.find({ select: ['id', 'name'] });
  }
}
