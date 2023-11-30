import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "src/events/entities/event.entity";
import { Team } from "src/teams/entities/team.entity";
import { Coach } from "src/users/entities/coach.entity";
import { TeamRegistration } from "./entities/team-registration.entity";
import { TeamRegistrationController } from "./team-registration.controller";
import { TeamRegistrationService } from "./team-registration.service";

@Module({
  imports: [TypeOrmModule.forFeature([TeamRegistration, Team, Event, Coach])],
  controllers: [TeamRegistrationController],
  providers: [TeamRegistrationService],
})
export class TeamRegistrationModule {}
