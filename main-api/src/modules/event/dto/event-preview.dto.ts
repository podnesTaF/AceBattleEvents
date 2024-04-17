import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateContentDto } from 'src/modules/content/dto/create-content.dto';

export class CreateEventPreviewDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  season: string;

  @IsString()
  @IsOptional()
  locationInfo?: string;

  @IsDateString()
  @IsOptional()
  date?: Date;

  @Transform(({ value }) => !!value, { toClassOnly: true })
  @IsBoolean()
  @IsOptional()
  announced: boolean;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  @IsOptional()
  eventId: number;

  @IsArray()
  @IsOptional()
  contents: CreateContentDto[];
}

export class UpdateEventPreviewDto extends PartialType(CreateEventPreviewDto) {
  @IsBoolean()
  @IsOptional()
  replaceContents: boolean;
}
