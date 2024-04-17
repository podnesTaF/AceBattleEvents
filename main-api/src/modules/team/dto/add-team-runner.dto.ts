import { IsArray, IsNumber } from 'class-validator';

export class AddTeamRunnerDto {
  @IsNumber()
  teamId: number;

  @IsArray()
  runners: number[];
}
