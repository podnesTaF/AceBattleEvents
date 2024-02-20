import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTimetableRowDto {
  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  event: string;

  @IsNumber()
  @IsOptional()
  timetableId: number;
}
