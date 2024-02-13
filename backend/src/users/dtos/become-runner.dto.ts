import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBestResultDto } from 'src/best-results/dto/create-best-result.dto';

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
  city: string;

  @IsArray()
  bestResults?: CreateBestResultDto[];
}
