import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsService } from 'src/locations/locations.service';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private repository: Repository<EventEntity>,
    private locationsService: LocationsService,
  ) {}

  async create(eventDto: CreateEventDto) {
    const { latitude, longitude, city, country } = eventDto;
    const location = await this.locationsService.create({
      latitude,
      longitude,
      city,
      country,
    });

    const { title, description, date, imageUrl, price, prize } = eventDto;

    return this.repository.save({
      title,
      description,
      date,
      imageUrl,
      price,
      location,
      prize,
    });
  }

  getAll(query: any) {
    const qb = this.repository
      .createQueryBuilder('event')
      .leftJoin('event.teams', 'team')
      .loadRelationCountAndMap('event.teamsCount', 'event.teams');

    if (query.month) {
      const month = query.month.toLowerCase();
      qb.where('LOWER(MONTH(event.date)) = :month', { month });
    }

    if (query.year) {
      qb.andWhere('YEAR(event.date) = :year', { year: query.year });
    }

    if (query.passedEvents === 'true') {
      qb.andWhere('event.date < NOW()');
    }

    if (query.name) {
      qb.andWhere('event.title LIKE :name', { name: `%${query.name}%` });
    }

    if (query.country) {
      qb.innerJoin('event.location', 'location');
      qb.andWhere('location.country = :country', { country: query.country });
    }

    return qb.getMany();
  }

  getEventById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['location', 'teams'],
    });
  }
}
