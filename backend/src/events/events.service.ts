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
      date: new Date(date),
      imageUrl,
      price,
      location,
      prize,
    });
  }

  async getAll(query: any) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 10;

    const qb = this.repository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoin('event.teams', 'team')
      .loadRelationCountAndMap('event.teamsCount', 'event.teams');

    if (query.month) {
      const month = query.month.toLowerCase();
      const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1; // Get the month index (1-12)
      qb.where('EXTRACT(MONTH FROM event.date) = :monthIndex', { monthIndex });
    }

    if (query.year) {
      const year = +query.year;
      if (!isNaN(year)) {
        qb.andWhere('YEAR(event.date) = :year', { year });
      }
    }

    if (query.name) {
      qb.andWhere('event.title LIKE :name', { name: `%${query.name}%` });
    }

    if (query.country) {
      qb.andWhere('location.country LIKE :country', {
        country: `%${query.country}%`,
      });
    }

    const totalItems = await qb.getCount();

    const totalPages = Math.ceil(totalItems / limit);

    qb.skip((page - 1) * limit).take(limit);

    const events = await qb.getMany();

    return { events, totalPages };
  }

  getEventById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['location', 'teams'],
    });
  }
}
