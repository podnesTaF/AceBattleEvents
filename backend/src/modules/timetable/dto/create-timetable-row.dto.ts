import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTimetableRowDto {
  @IsString()
  callRoomTime?: Date;

  @IsDateString()
  startTime: Date;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  event: string;

  @IsNumber()
  @IsOptional()
  timetableId: number;

  @IsString()
  @IsOptional()
  teamMembers?: string;
}
