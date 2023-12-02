import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamRaceRunner } from "./entities/team-race-runner.entity";
import { TeamRaceRunnerController } from "./team-race-runner.controller";
import { TeamRaceRunnerService } from "./team-race-runner.service";

@Module({
  imports: [TypeOrmModule.forFeature([TeamRaceRunner])],
  controllers: [TeamRaceRunnerController],
  providers: [TeamRaceRunnerService],
  exports: [TeamRaceRunnerService],
})
export class TeamRaceRunnerModule {}
