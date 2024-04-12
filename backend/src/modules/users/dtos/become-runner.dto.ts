import { OmitType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBestResultDto } from 'src/modules/best-results/dto/create-best-result.dto';

export class CreateBestResultForUser extends OmitType(CreateBestResultDto, [
  'runnerId',
] as const) {}

export class BecomeRunnerDto {
  @IsDateString()
  dateOfBirth: Date;

  @IsNumber()
  genderId: number;

  @IsString()
  @IsOptional()
  avatarName: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsArray()
  bestResults?: CreateBestResultForUser[];
}
