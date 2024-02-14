import { OmitType } from '@nestjs/mapped-types';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBestResultDto } from 'src/best-results/dto/create-best-result.dto';

export class CreateBestResultForUser extends OmitType(CreateBestResultDto, [
  'runnerId',
] as const) {}

export class BecomeRunnerDto {
  @IsString()
  dateOfBirth: string;

  @IsNumber()
  genderId: number;

  @IsString()
  avatarUrl: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  countryId: number;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  city: string;

  @IsArray()
  bestResults?: CreateBestResultForUser[];
}
