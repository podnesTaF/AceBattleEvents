import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "src/events/entities/event.entity";
import { Team } from "src/teams/entities/team.entity";
import { Coach } from "src/users/entities/coach.entity";
import { Repository } from "typeorm";
import { CreateTeamRegistrationDto } from "./dto/create-team-registration.dto";
import { UpdateTeamRegistrationDto } from "./dto/update-team-registration.dto";
import { TeamRegistration } from "./entities/team-registration.entity";

@Injectable()
export class TeamRegistrationService {
  constructor(
    @InjectRepository(TeamRegistration)
    private readonly repository: Repository<TeamRegistration>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Coach)
    private readonly coachRepository: Repository<Coach>,
  ) {}

  async create(dto: CreateTeamRegistrationDto, userId: number) {
    const team = await this.teamRepository.findOneOrFail({
      where: { id: dto.teamId },
      relations: ["manager", "manager.user"],
    });

    if (team.manager.user.id !== userId)
      throw new ForbiddenException("You are not allowed to assign this team");

    const event = await this.eventRepository.findOneOrFail({
      where: { id: dto.eventId },
    });

    if (event.startDateTime < new Date())
      throw new BadRequestException(
        "You are not allowed to register for past events",
      );

    const coach = await this.coachRepository.findOneOrFail({
      where: { id: dto.coachId },
      relations: ["manager", "manager.user"],
    });

    if (coach.manager.user.id !== userId)
      throw new ForbiddenException("You are not allowed to assign this coach");

    const teamRegistration = this.repository.create({
      team,
      event,
      coach,
    });

    return this.repository.save(teamRegistration);
  }

  findAll() {
    return `This action returns all teamRegistration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamRegistration`;
  }

  update(id: number, updateTeamRegistrationDto: UpdateTeamRegistrationDto) {
    return `This action updates a #${id} teamRegistration`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamRegistration`;
  }
}
