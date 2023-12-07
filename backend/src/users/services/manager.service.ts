import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Manager } from "../entities/manager.entity";

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private repository: Repository<Manager>,
  ) {}

  async findAll() {
    const manager = await this.repository.find({
      relations: ["user.image", "user.avatar", "user.country", "teams"],
    });

    return manager;
  }

  findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ["user.image", "user.country", "club"],
    });
  }
}
