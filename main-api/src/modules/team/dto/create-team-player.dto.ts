import { IsNumber } from 'class-validator';

export class CreateTeamPlayerDto {
  @IsNumber()
  teamId: number;

  @IsNumber()
  runnerId: number;
}
