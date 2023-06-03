import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachService } from 'src/coach/coach.service';
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

    const coach = await this.coachService.create(dto.coach);

    const manager = await this.userService.findById(managerId);
    return this.repository.save({
      name: dto.name,
      club: dto.club,
      city: dto.city,
      coach,
      players,
      manager,
    });
  }

  findAll() {
    return `This action returns all teams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
