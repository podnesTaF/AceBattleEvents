import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FutureEvent } from "./entities/future-event.entity";

@Injectable()
export class FutureEventsService {
  constructor(
    @InjectRepository(FutureEvent)
    private readonly repository: Repository<FutureEvent>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(event: Partial<FutureEvent>) {
    return await this.repository.save(event);
  }

  async getAll() {
    const futureEvents = await this.repository.find({
      relations: ["introImage"],
    });
    const events = await this.eventRepository
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.introImage", "introImage")
      .where("event.startDateTime > :date", { date: new Date() })
      .getMany();

    return { futureEvents, events };
  }
}
