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
}
