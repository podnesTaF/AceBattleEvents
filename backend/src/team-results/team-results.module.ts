import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Best } from "src/bests/entities/best.entity";
import { CountryService } from "src/country/country.service";
import { Country } from "src/country/entity/country.entity";
import { Race } from "src/race/entities/race.entity";
import { RunnerResult } from "src/runner-results/entities/runner-results.entity";
import { RunnerResultsService } from "src/runner-results/runner-results.service";
import { Split } from "src/splits/entities/splits.entity";
import { SplitsService } from "src/splits/splits.service";
import { Team } from "src/teams/entities/team.entity";
import { Manager } from "src/users/entities/manager.entity";
import { Runner } from "src/users/entities/runner.entity";
import { User } from "src/users/entities/user.entity";
import { RunnerService } from "src/users/services/runner.service";
import { TeamResult } from "./entities/team-results.entity";
import { TeamResultsController } from "./team-results.controller";
import { TeamResultsService } from "./team-results.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamResult,
      Race,
      Team,
      RunnerResult,
      Country,
      Split,
      Runner,
      User,
      Manager,
      Best,
    ]),
  ],
  controllers: [TeamResultsController],
  providers: [
    TeamResultsService,
    RunnerResultsService,
    SplitsService,
    CountryService,
    RunnerService,
  ],
})
export class TeamResultsModule {}
