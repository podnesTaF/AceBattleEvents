import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateRaceDto {
  @IsString()
  startTime: string;

  @IsNumber()
  eventId: number;

  @IsArray()
  teamIds: number[];
}
