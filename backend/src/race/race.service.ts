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
}