import { IsObject } from "class-validator";
import { RaceRegistration } from "src/race-registration/entities/race-registration.entity";
import { Runner } from "src/users/entities/runner.entity";

export class CreateTeamRaceRunnerDto {
  @IsObject()
  raceRegistration: RaceRegistration;

  @IsObject()
  runner: Runner;
}
