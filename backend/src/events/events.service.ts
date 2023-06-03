import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsService } from 'src/locations/locations.service';
import { TeamEntity } from 'src/teams/entities/team.entity';
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
    const location = await this.locationsService.create({
      latitude: eventDto.latitude,
      longitude: eventDto.longitude,
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

  getAll() {
    return this.repository
      .createQueryBuilder('event')
      .leftJoinAndMapMany(
        'event.teams',
        TeamEntity,
        'team',
        'team.eventId = event.id',
      )
      .loadRelationCountAndMap('event.teamsCount', 'event.teams', 'teams')
      .orderBy('posts.createdAt', 'DESC')
      .getMany();
  }

  getEventById(id: number) {
    return this.repository.findOne({ where: { id }, relations: ['location'] });
  }
}
