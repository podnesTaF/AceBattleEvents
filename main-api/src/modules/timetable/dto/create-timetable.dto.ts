import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateTimetableRowDto } from './create-timetable-row.dto';

export class CreateTimetableDto {
  @IsDateString()
  startTime: Date;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  eventId: number;

  @IsArray()
  timetableRows: CreateTimetableRowDto[];
}
