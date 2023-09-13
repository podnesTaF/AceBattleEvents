import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { CreateRaceDto } from './dto/create-race.dto';
import { Race } from './entities/race.entity';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race)
    private repository: Repository<Race>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async createRace(dto: CreateRaceDto) {
    const teams = [];

    for (const teamId of dto.teamIds) {
      const team = await this.teamRepository.findOne({ where: { id: teamId } });
      if (team) {
        teams.push(team);
      }
    }

    const event = await this.eventRepository.findOne({
      where: { id: dto.eventId },
    });

    if (!event) {
      throw new Error('You provided wrong event');
    }

    return this.repository.save({
      startTime: dto.startTime,
      teams,
      event,
    });
  }

  async getAllRaces(queries: {
    page: number;
    limit: number;
    category?: string;
    country?: string;
    year?: string;
    isFinished?: string;
    name?: string;
  }) {
    const count = await this.repository.count();
    const page = +queries?.page || 1;
    const limit = +queries?.limit || 5;

    const qb = this.repository
      .createQueryBuilder('race')
      .leftJoinAndSelect('race.event', 'event')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoinAndSelect('location.country', 'country')
      .leftJoinAndSelect('race.winner', 'winner')
      .leftJoinAndSelect('race.teamResults', 'teamResults')
      .leftJoinAndSelect('teamResults.team', 'team');

    if (queries.name) {
      qb.andWhere('event.title LIKE :name', { name: `%${queries.name}%` });
    }

    if (queries.category) {
      qb.andWhere('event.category = :category', { category: queries.category });
    }

    if (queries.country) {
      qb.andWhere('country.name LIKE :country', {
        country: `%${queries.country}%`,
      });
    }

    if (queries.year) {
      const year = +queries.year;
      if (!isNaN(year)) {
        qb.andWhere('YEAR(event.startDateTime) = :year', { year });
      }
    }

    if (queries.isFinished) {
      qb.andWhere('winner.id IS NOT NULL');
    }

    qb.skip((page - 1) * limit).take(limit);

    const races = await qb.getMany();

    return {
      races,
      totalPages: Math.ceil(count / limit),
    };
  }

  async getRace(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: [
        'event',
        'winner',
        'teamResults',
        'teamResults.team',
        'teams',
      ],
    });
  }

  async getFullRace(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: [
        'event',
        'winner',
        'teamResults',
        'teamResults.team',
        'teams',
        'teamResults.runnerResults',
        'teamResults.runnerResults.runner',
        'teamResults.runnerResults.runner.club',
        'teamResults.runnerResults.splits',
      ],
    });
  }

  getAllRacesByEvent(id: number) {
    return this.repository
      .createQueryBuilder('race')
      .leftJoinAndSelect('race.teams', 'teams')
      .leftJoinAndSelect('race.event', 'event')
      .where('event.id = :eventId', { eventId: id })
      .getMany();
  }

  async updateWinner(teamId: number, raceId: number) {
    const winner = await this.teamRepository.findOne({ where: { id: teamId } });

    return this.repository.update(raceId, { winner });
  }

  async updateRace(
    id: number,
    body: { teamIds: number[]; startTime: string; eventId: number },
  ) {
    const race = await this.repository.findOne({
      where: { id },
      relations: ['teams', 'event'],
    });

    const teams = await Promise.all(
      body.teamIds.map(async (id) => {
        const team = await this.teamRepository.findOne({ where: { id } });
        if (team) {
          return team;
        }
      }),
    );

    const event = await this.eventRepository.findOne({
      where: { id: body.eventId },
    });

    race.teams = teams || race.teams;
    race.startTime = new Date(body.startTime) || race.startTime;
    race.event = event || race.event;

    return this.repository.save(race);
  }

  deleteRace(id: number) {
    return this.repository.delete(id);
  }
}
