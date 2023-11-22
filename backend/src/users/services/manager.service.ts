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

  findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ["user.image", "user.country", "club"],
    });
  }
}
