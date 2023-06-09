import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachService } from 'src/coach/coach.service';
import { CountryService } from 'src/country/country.service';
import { Event } from 'src/events/entities/event.entity';
import { PlayersService } from 'src/players/players.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private repository: Repository<Team>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private playersService: PlayersService,
    private coachService: CoachService,
    private userService: UserService,
    private countryService: CountryService,
  ) {}

  async create(dto: CreateTeamDto, managerId: number) {
    const players = [];

    for (let i = 0; i < dto.players.length; i++) {
      const res = await this.playersService.create(dto.players[i]);
      players.push(res);
    }

    const coach = await this.coachService.create(dto.coach);

    const manager = await this.userService.findById(managerId);

    const country = await this.countryService.findById(dto.countryId);

    return this.repository.save({
      name: dto.name,
      club: dto.club,
      city: dto.city,
      gender: dto.gender,
      country,
      logo: dto.logo,
      teamImage: dto.teamImage,
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

    await this.repository.save(team);
    await this.eventRepository.save(event);
  }

  async findAll(queries: any, userId?: number) {
    const page = +queries.page || 1; // Default to page 1 if not provided
    const limit = +queries.limit || 5;

    const qb = this.repository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.country', 'country')
      .leftJoinAndSelect('team.coach', 'coach')
      .leftJoinAndSelect('team.players', 'players')
      .leftJoinAndSelect('team.logo', 'logo')
      .leftJoinAndSelect('players.personalBests', 'personalBests')
      .leftJoinAndSelect('team.events', 'events');

    if (queries.user) {
      qb.where('team.managerId = :id', { id: userId });

      return qb.getMany();
    }

    if (queries.country) {
      qb.where('country.name = :name', { name: queries.country });
    }

    if (queries.gender) {
      qb.andWhere('team.gender = :gender', { gender: queries.gender });
    }

    if (queries.name) {
      qb.andWhere('team.gender = :name', { name: queries.name });
    }

    const totalItems = await qb.getCount();

    const totalPages = Math.ceil(totalItems / limit);

    qb.skip((page - 1) * limit).take(limit);

    const teams = await qb.getMany();

    return {
      teams,
      totalPages,
    };
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
        'events.location.country',
        'events.prizes',
        'coach',
      ],
      order: { id: 'ASC' },
    });
    const removeUnnecessary = (event: Event) => {
      const totalPrize = event.prizes.reduce(
        (acc, curr) => acc + curr.amount,
        0,
      );
      delete event.prizes;
      delete event.teams;

      return {
        ...event,
        totalPrize,
      };
    };

    const removeUnnecessaryForTeam = (team: Team) => {
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

  async findAllByUser(userId?: number) {
    return this.repository.find({
      where: { manager: { id: +userId } },
      relations: ['players', 'coach', 'logo', 'country'],
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['events', 'players', 'coach', 'logo', 'country'],
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
