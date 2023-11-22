import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FutureEvent } from "./entities/future-event.entity";

@Injectable()
export class FutureEventsService {
  constructor(
    @InjectRepository(FutureEvent)
    private readonly repository: Repository<FutureEvent>,
  ) {}

  async create(event: Partial<FutureEvent>) {
    return await this.repository.save(event);
  }

  getAll() {
    return this.repository.find({ relations: ["introImage"] });
  }
}
