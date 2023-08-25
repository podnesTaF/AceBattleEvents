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

  async getAllRaces(queries: { page: number; limit: number }) {
    const count = await this.repository.count();
    const page = +queries.page || 1;
    const limit = +queries.limit || 5;

    const races = await this.repository.find({
      relations: ['event', 'winner', 'teamResults', 'teamResults.team'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      races,
      totalPages: Math.ceil(count / limit),
    };
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

  async updateRace(id: number, teams: Team[], newStartDate?: string) {
    const race = await this.repository.findOne({
      where: { id },
      relations: ['teams'],
    });

    race.teams = teams || race.teams;
    race.startTime = new Date(newStartDate) || race.startTime;

    return this.repository.save(race);
  }

  deleteRace(id: number) {
    return this.repository.delete(id);
  }
}
