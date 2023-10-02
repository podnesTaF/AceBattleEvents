import { IsArray, IsNumber } from 'class-validator';
import { CreateRunnerResultDto } from 'src/runner-results/dto/create-runner-result.dto';

export class CreateTeamResultDto {
  @IsNumber()
  teamId: number;

  @IsNumber()
  resultInMs: number;

  @IsNumber()
  raceId: number;

  @IsArray()
  runnerResults: CreateRunnerResultDto[];
}
