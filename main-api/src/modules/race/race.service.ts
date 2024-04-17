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

  async getFullRace(id: number): Promise<Race> {
    return this.raceRepository.findOne({
      where: { id },
      relations: [
        'eventRaceType',
        'eventRaceType.raceType',
        'eventRaceType.event',
        'raceRunners',
        'raceTeams.team',
        'raceTeams.raceRunners.runnerRole',
        'raceTeams.raceRunners.splits',
        'raceTeams.raceRunners.runner.country',
      ],
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

  getLastMatches(query: {
    runnerId?: string;
    teamId?: string;
    count?: string;
  }) {
    const qb = this.raceRepository
      .createQueryBuilder('race')
      .leftJoinAndSelect('race.eventRaceType', 'eventRaceType')
      .leftJoinAndSelect('eventRaceType.event', 'event')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoinAndSelect('location.country', 'country')
      .leftJoinAndSelect('race.raceTeams', 'raceTeams')
      .leftJoinAndSelect('raceTeams.team', 'team');

    if (query.runnerId) {
      qb.leftJoinAndSelect('raceTeams.raceRunners', 'raceRunners').where(
        'raceRunners.runnerId = :runnerId',
        {
          runnerId: +query.runnerId,
        },
      );
    }

    if (query.teamId) {
      qb.andWhere('team.id = :teamId', {
        teamId: +query.teamId,
      });
    }

    qb.andWhere('race.startTime < :now', {
      now: new Date(), // Current time
    })
      .orderBy('race.startTime', 'DESC') // Order by startTime in descending order
      .take(query.count ? +query.count : 5);

    return qb.getMany();
  }
}
