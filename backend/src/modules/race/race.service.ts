import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRaceType } from 'src/modules/event-race-type/entities/event-race-type.entity';
import { Repository } from 'typeorm';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { Race } from './entities/race.entity';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
    @InjectRepository(EventRaceType)
    private readonly eventRaceTypeRepository: Repository<EventRaceType>,
  ) {}

  async createRace(
    eventRaceTypeId: number,
    dto: CreateRaceDto[],
  ): Promise<Race[]> {
    const eventRaceType = await this.eventRaceTypeRepository.findOne({
      where: {
        id: eventRaceTypeId,
      },
    });

    if (!eventRaceType) {
      throw new NotFoundException('Event race type not found');
    }

    return this.raceRepository.save(
      dto.map((r) => ({ ...r, eventRaceTypeId: eventRaceTypeId })),
    );
  }

  async getRace(id: number): Promise<Race> {
    return await this.raceRepository.findOne({
      where: {
        id: id,
      },
      relations: ['raceTeams.team', 'raceTeams.raceRunners.runner'],
    });
  }

  // update
  async updateRace(raceId: number, dto: UpdateRaceDto) {
    const race = await this.raceRepository.findOne({ where: { id: raceId } });
    if (!race) {
      throw new NotFoundException('Race not Found');
    }

    race.startTime = dto.startTime ?? race.startTime;
    race.finished = dto.finished ?? race.finished;
    race.name = dto.name ?? race.name;
    race.description = dto.description ?? race.description;

    race.published = this.setRaceStatus(race, dto.published);

    return this.raceRepository.save(race);
  }

  // publish / unpublish race
  setRaceStatus(race: Race, published?: boolean): boolean {
    if (published === undefined) {
      return race.published;
    }
    if (race.finished) {
      throw new BadRequestException(
        'You cannot change status to the finished race',
      );
    }

    return published;
  }
}
