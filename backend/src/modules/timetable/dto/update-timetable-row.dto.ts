import { PartialType } from '@nestjs/mapped-types';
import { CreateTimetableRowDto } from './create-timetable-row.dto';

export class UpdateTimetableRowDto extends PartialType(CreateTimetableRowDto) {}
