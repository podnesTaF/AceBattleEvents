import { IsNumber, IsString } from 'class-validator';

export class CreatePenaltyDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly toAddInMs: number;
}
