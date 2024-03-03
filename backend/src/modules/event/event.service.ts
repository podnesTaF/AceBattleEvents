import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventType } from './entities/event-type.entity';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventType)
    private readonly eventTypeRepository: Repository<EventType>,
  ) {}

  // get full event

  getFullEvent(id: number): Promise<Event> {
    return this.eventRepository.findOne({
      where: { id },
      relations: [
        'location',
        'type',
        'timetables.rows',
        'location.country',
        'eventRaceTypes.raceType',
      ],
    });
  }

  async createEvent(dto: CreateEventDto): Promise<Event> {
    return await this.eventRepository.save({
      ...dto,
    });
  }

  // create event type
  async createEventType(dto: CreateEventTypeDto): Promise<EventType> {
    return await this.eventTypeRepository.save({
      ...dto,
    });
  }

  // update event location
  async updateLocation(eventId: number, locationId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    event.locationId = locationId;
    return await this.eventRepository.save(event);
  }
  y;

  // update event information
  async updateEvent(
    eventId: number,
    dto: UpdateEventDto,
  ): Promise<UpdateResult> {
    return await this.eventRepository.update(eventId, dto);
  }

  // get all events
  async getAll(query: any) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 5;

    const qb = this.eventRepository
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

    if (query.finished) {
      qb.andWhere('event.endDate < :now', { now: new Date() });
    } else {
      qb.andWhere('event.endDate > :now', { now: new Date() });
    }

    const totalItems = await qb.getCount();

    const totalPages = Math.ceil(totalItems / limit);

    qb.skip((page - 1) * limit).take(limit);

    const events = await qb.getMany();

    return { events, totalPages };
  }
}
