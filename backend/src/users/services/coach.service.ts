import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCoachDto } from "../dtos/create-coach.dto";
import { Coach } from "../entities/coach.entity";

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(Coach)
    private repository: Repository<Coach>,
  ) {}

  async create(dto: CreateCoachDto) {
    return await this.repository.save({ manager: { id: dto.managerId } });
  }

  findById(id: number) {
    return { id };
  }
}
