import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { FutureEvent } from "./entities/future-event.entity";
import { FutureEventsController } from "./future-events.controller";
import { FutureEventsService } from "./future-events.service";

@Module({
  controllers: [FutureEventsController],
  providers: [FutureEventsService],
  imports: [TypeOrmModule.forFeature([FutureEvent, Event])],
})
export class FutureEventsModule {}
