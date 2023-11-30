import { IsNumber } from "class-validator";

export class CreateTeamRegistrationDto {
  @IsNumber()
  eventId: number;

  @IsNumber()
  teamId: number;

  @IsNumber()
  coachId: number;
}
