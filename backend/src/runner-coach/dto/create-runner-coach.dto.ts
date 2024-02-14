import { IsNumber } from 'class-validator';

export class CreateRunnerCoachDto {
  @IsNumber()
  runnerId: number;

  @IsNumber()
  coachId: number;
}
