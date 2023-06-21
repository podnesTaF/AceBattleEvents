import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsService } from 'src/locations/locations.service';
import { PrizesService } from 'src/prizes/prizes.service';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>,
    private locationsService: LocationsService,
    private prizeService: PrizesService,
  ) {}

  async create(eventDto: CreateEventDto) {
    const location = await this.locationsService.create(eventDto.location);

    const prizes = [];

    eventDto.prizes.forEach(async (prize) => {
      const createdPrize = await this.prizeService.create(prize);

      prizes.push(createdPrize);
    });

    const { title, description, date, introImageUrl, minorImageUrl } = eventDto;

    return this.repository.save({
      title,
      description,
      date: new Date(date),
      introImageUrl,
      minorImageUrl,
      location,
      prizes,
    });
  }

  async getAll(query: any) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 5;

    const qb = this.repository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoin('event.teams', 'team')
      .loadRelationCountAndMap('event.teamsCount', 'event.teams')
      .leftJoinAndSelect('event.prizes', 'prize');

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

    const resEvents = events.map((ev) => {
      const totalPrize = ev.prizes.reduce((acc, curr) => acc + curr.sum, 0);

      delete ev.prizes;

      return {
        ...ev,
        totalPrize,
      };
    });

    return { events: resEvents, totalPages };
  }

  async getEventById(id: number) {
    const event = await this.repository.findOne({
      where: { id },
      relations: [
        'location',
        'teams',
        'teams.coach',
        'prizes',
        'teams.players',
      ],
    });

    let updatedTeams = [];
    if (event) {
      event.teams.forEach((team) => {
        const membersCount = team.players.length;
        delete team.players;
        updatedTeams.push({
          ...team,
          membersCount,
        });
      });
    }

    event.teams = updatedTeams;

    return event;
  }
}
