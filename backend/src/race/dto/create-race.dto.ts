import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateRaceDto {
  @IsString()
  startTime: string;

  @IsString()
  name: string;

  @IsNumber()
  eventId: number;

  @IsArray()
  teamIds: number[];
}
