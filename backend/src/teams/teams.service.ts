import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachService } from 'src/coach/coach.service';
import { EventEntity } from 'src/events/entities/event.entity';
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
  ) {}

  async create(dto: CreateTeamDto, managerId: number) {
    const players = [];
    dto.players.forEach(async (player) => {
      const res = await this.playersService.create(player);
      players.push(res);
    });

    console.log('players.', players);

    const coach = await this.coachService.create(dto.coach);

    console.log('coach', coach);

    const manager = await this.userService.findById(managerId);

    console.log('manager', manager);
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

  async register(dto: { teamId: number; eventId: number }) {
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

  findAll() {
    return `This action returns all teams`;
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
