import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePersonalBestDto } from "./dto/create-personal-best.dto";
import { UpdatePersonalBestDto } from "./dto/update-personal-best.dto";
import { Best } from "./entities/best.entity";

@Injectable()
export class BestsService {
  constructor(
    @InjectRepository(Best)
    private repository: Repository<Best>,
  ) {}
  create(dto: CreatePersonalBestDto) {
    return this.repository.save({
      distanceInCm: +dto.distanceInCm,
      result: dto.result,
    });
  }

  findAll() {
    return `This action returns all personalBests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalBest`;
  }

  update(id: number, updatePersonalBestDto: UpdatePersonalBestDto) {
    return `This action updates a #${id} personalBest`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalBest`;
  }
}
