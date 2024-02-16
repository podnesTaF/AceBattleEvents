import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/event/entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventRaceTypeDto } from './dto/create-event-race-type.dto';
import { CreateRaceTypeDto } from './dto/create-race-type.dto';
import { EventRaceType } from './entities/event-race-type.entity';
import { RaceType } from './entities/race-type.entity';

@Injectable()
export class EventRaceTypeService {
  constructor(
    @InjectRepository(EventRaceType)
    private readonly eventRaceTypeRepository: Repository<EventRaceType>,
    @InjectRepository(RaceType)
    private readonly raceTypeRepository: Repository<RaceType>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createRaceType(dto: CreateRaceTypeDto): Promise<RaceType> {
    return await this.raceTypeRepository.save({
      ...dto,
    });
  }

  // add race type for the event
  async addRaceTypeToEvent(
    eventId: number,
    dto: CreateEventRaceTypeDto,
  ): Promise<EventRaceType> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const raceType = await this.raceTypeRepository.findOne({
      where: { id: dto.raceTypeId },
    });

    if (!raceType) {
      throw new NotFoundException('Race type not found');
    }

    return await this.eventRaceTypeRepository.save({
      ...dto,
      eventId,
    });
  }
}
