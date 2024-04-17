import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/modules/event/entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventRaceTypeDto } from './dto/create-event-race-type.dto';
import { CreateRaceTypeDto } from './dto/create-race-type.dto';
import { CreateRegistrationFeeDto } from './dto/create-registration-fee.dto';
import { EventRaceType } from './entities/event-race-type.entity';
import { RaceType } from './entities/race-type.entity';
import { RegistrationFee } from './entities/registration-fee.entity';

@Injectable()
export class EventRaceTypeService {
  constructor(
    @InjectRepository(EventRaceType)
    private readonly eventRaceTypeRepository: Repository<EventRaceType>,
    @InjectRepository(RaceType)
    private readonly raceTypeRepository: Repository<RaceType>,
    @InjectRepository(RegistrationFee)
    private readonly registrationFeeRepository: Repository<RegistrationFee>,
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

  // get by event id
  async getEventRaceTypes(eventId: number): Promise<EventRaceType[]> {
    const types = await this.eventRaceTypeRepository.find({
      where: { eventId },
      relations: ['raceType', 'registrationFees', 'registrations'],
    });

    return types.map((type) => {
      return {
        ...type,
        registrations: null,
        registrationsCount: type.registrations.length,
      };
    });
  }

  // create registration fee
  async createRegistrationFee(
    dto: CreateRegistrationFeeDto,
  ): Promise<RegistrationFee> {
    return await this.registrationFeeRepository.save({
      ...dto,
    });
  }
}
