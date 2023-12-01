import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTeamRaceRunnerDto } from "./dto/create-team-race-runner.dto";
import { UpdateTeamRaceRunnerDto } from "./dto/update-team-race-runner.dto";
import { TeamRaceRunner } from "./entities/team-race-runner.entity";

@Injectable()
export class TeamRaceRunnerService {
  constructor(
    @InjectRepository(TeamRaceRunner)
    private readonly repository: Repository<TeamRaceRunner>,
  ) {}

  create(dto: CreateTeamRaceRunnerDto) {
    return this.repository.save({
      ...dto,
    });
  }

  findAll() {
    return `This action returns all teamRaceRunner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamRaceRunner`;
  }

  update(id: number, updateTeamRaceRunnerDto: UpdateTeamRaceRunnerDto) {
    return `This action updates a #${id} teamRaceRunner`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamRaceRunner`;
  }
}
