import { IsNumber } from "class-validator";

export class CreateRaceRegistrationDto {
  @IsNumber()
  raceId: number;

  @IsNumber()
  teamId: number;
}
