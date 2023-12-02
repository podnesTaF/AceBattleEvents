import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber } from "class-validator";

export class CheckInDto {
  @IsArray()
  @ArrayMinSize(7, {
    message: "The final structure of the team has to be 7 runners.",
  })
  @ArrayMaxSize(7, {
    message: "The final structure of the team has to be 7 runners.",
  })
  runnerIds: number[];

  @IsNumber()
  raceRegistrationId: number;
}
