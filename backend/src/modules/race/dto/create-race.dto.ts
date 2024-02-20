import { IsDateString, IsString } from 'class-validator';

export class CreateRaceDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsDateString()
  readonly startTime: Date;
}
