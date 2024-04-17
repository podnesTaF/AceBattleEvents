import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  eventCode: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsDateString()
  startDateTime: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @Type(() => Number)
  @IsNumber()
  typeId: number;
}
