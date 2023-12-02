import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Race } from "src/race/entities/race.entity";
import { TeamRaceRunner } from "src/team-race-runner/entities/team-race-runner.entity";
import { Team } from "src/teams/entities/team.entity";
import { Runner } from "src/users/entities/runner.entity";
import { RaceRegistration } from "./entities/race-registration.entity";
import { RaceRegistrationController } from "./race-registration.controller";
import { RaceRegistrationService } from "./race-registration.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RaceRegistration,
      TeamRaceRunner,
      Runner,
      Team,
      Race,
    ]),
  ],
  controllers: [RaceRegistrationController],
  providers: [RaceRegistrationService],
  exports: [RaceRegistrationService],
})
export class RaceRegistrationModule {}
