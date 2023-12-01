import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "src/events/entities/event.entity";
import { RaceRegistration } from "src/race-registration/entities/race-registration.entity";
import { RaceRegistrationService } from "src/race-registration/race-registration.service";
import { TeamRaceRunner } from "src/team-race-runner/entities/team-race-runner.entity";
import { Team } from "src/teams/entities/team.entity";
import { Runner } from "src/users/entities/runner.entity";
import { Race } from "./entities/race.entity";
import { RaceController } from "./race.controller";
import { RaceService } from "./race.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Race,
      Event,
      Team,
      RaceRegistration,
      Runner,
      TeamRaceRunner,
    ]),
  ],
  controllers: [RaceController],
  providers: [RaceService, RaceRegistrationService],
})
export class RaceModule {}
