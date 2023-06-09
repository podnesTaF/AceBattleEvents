import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryService } from 'src/country/country.service';
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
    private countriesService: CountryService,
  ) {}

  async create(eventDto: CreateEventDto, storage: Storage) {
    let country = await this.countriesService.returnIfExist({
      name: eventDto.location.country,
    });

    if (!country) {
      country = await this.countriesService.create(eventDto.location.country);
    }
    const location = await this.locationsService.create(
      eventDto.location,
      country,
    );

    const prizes = [];

    for (let i = 0; i < eventDto.prizes.length; i++) {
      const prize = eventDto.prizes[i];
      const createdPrize = await this.prizeService.create(prize);
      prizes.push(createdPrize);
    }

    const {
      title,
      description,
      startDateTime,
      endDate,
      introImage,
      minorImage,
    } = eventDto;

    return this.repository.save({
      title,
      description,
      startDateTime: new Date(startDateTime),
      endDate: new Date(endDate),
      introImage: introImage || null,
      minorImage: minorImage || null,
      location,
      prizes,
    });
  }

  async getAll(query: any) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 5;

    const qb = this.repository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.introImage', 'introImage')
      .leftJoinAndSelect('event.minorImage', 'minorImage')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoinAndSelect('location.country', 'country')
      .leftJoin('event.teams', 'team')
      .loadRelationCountAndMap('event.teamsCount', 'event.teams')
      .leftJoinAndSelect('event.prizes', 'prize')
      .orderBy('event.id', 'DESC');

    if (query.month) {
      const month = query.month.toLowerCase();
      const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1; // Get the month index (1-12)
      qb.where('EXTRACT(MONTH FROM event.startDateTime) = :monthIndex', {
        monthIndex,
      });
    }

    if (query.year) {
      const year = +query.year;
      if (!isNaN(year)) {
        qb.andWhere('YEAR(event.startDateTime) = :year', { year });
      }
    }

    if (query.name) {
      qb.andWhere('event.title LIKE :name', { name: `%${query.name}%` });
    }

    if (query.country) {
      qb.andWhere('country.name LIKE :country', {
        country: `%${query.country}%`,
      });
    }

    const totalItems = await qb.getCount();

    const totalPages = Math.ceil(totalItems / limit);

    qb.skip((page - 1) * limit).take(limit);

    const events = await qb.getMany();

    const resEvents = events.map((ev) => {
      const totalPrize = ev.prizes.reduce((acc, curr) => acc + curr.amount, 0);

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
        'location.country',
        'teams',
        'teams.country',
        'teams.coach',
        'prizes',
        'teams.players',
        'introImage',
        'minorImage',
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

  async findLastEvent() {
    return this.repository.findOne({ where: { id: 25 } });
  }
}
