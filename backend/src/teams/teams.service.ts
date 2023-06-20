import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachService } from 'src/coach/coach.service';
import { EventEntity } from 'src/events/entities/event.entity';
import { EventsService } from 'src/events/events.service';
import { PlayersService } from 'src/players/players.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamEntity } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamEntity)
    private repository: Repository<TeamEntity>,
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    private playersService: PlayersService,
    private coachService: CoachService,
    private userService: UserService,
    private eventService: EventsService,
  ) {}

  async create(dto: CreateTeamDto, managerId: number) {
    const players = [];

    for (let i = 0; i < dto.players.length; i++) {
      const res = await this.playersService.create(dto.players[i]);
      players.push(res);
    }

    const coach = await this.coachService.create(dto.coach);

    const manager = await this.userService.findById(managerId);

    return this.repository.save({
      name: dto.name,
      club: dto.club,
      city: dto.city,
      country: dto.country,
      coach,
      players,
      manager,
    });
  }

  async register(
    dto: { teamId: number; eventId: number; txHash: string; wallet: string },
    userId: number,
  ) {
    const team = await this.repository.findOne({
      where: { id: dto.teamId },
      relations: ['events'],
    });

    const event = await this.eventRepository.findOne({
      where: { id: dto.eventId },
      relations: ['teams'],
    });

    if (!team || !event) {
      throw new NotFoundException('Team or event not found');
    }

    team.events.push(event);
    event.teams.push(team);

    await this.userService.createTransaction(
      userId,
      -event.price,
      'Event registration',
      dto.txHash,
      dto.wallet,
    );
    await this.userService.addToBalance(-event.price, userId);

    await this.repository.save(team);
    await this.eventRepository.save(event);
  }

  findAll(user?: string, userId?: number) {
    if (user) {
      return this.repository.find({
        where: { manager: { id: userId } },
        relations: ['players', 'players.personalBests', 'coach', 'events'],
      });
    }
    return this.repository.find({
      relations: ['players', 'players.personalBests'],
    });
  }

  async getRegistrations(
    userId: number,
    query: { page?: string; limit?: string },
  ) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 5;

    const teams = await this.repository.find({
      where: { manager: { id: +userId } },
      relations: [
        'events',
        'events.teams',
        'events.location',
        'events.prizes',
        'coach',
      ],
      order: { id: 'ASC' },
    });

    const removeUnnecessary = (event: EventEntity) => {
      const totalPrize = event.prizes.reduce((acc, curr) => acc + curr.sum, 0);
      delete event.prizes;
      delete event.teams;

      return {
        ...event,
        totalPrize,
      };
    };

    const removeUnnecessaryForTeam = (team: TeamEntity) => {
      delete team.events;
      return team;
    };

    const teamsForEvents = [];

    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].events.length; j++) {
        teamsForEvents.push({
          event: removeUnnecessary(teams[i].events[j]),
          team: teams[i],
        });
      }
    }

    for (let i = 0; i < teamsForEvents.length; i++) {
      teamsForEvents[i].team = removeUnnecessaryForTeam(teamsForEvents[i].team);
    }

    const totalItems = teamsForEvents.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return {
      teamsForEvents: teamsForEvents.slice(startIndex, endIndex),
      totalPages,
    };
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id }, relations: ['events'] });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
