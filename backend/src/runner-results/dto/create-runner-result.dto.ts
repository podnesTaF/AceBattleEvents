import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateSplitDto } from 'src/splits/dto/create-split.dto';

export class CreateRunnerResultDto {
  @IsNumber()
  @IsOptional()
  teamResultId?: number;

  @IsNumber()
  runnerId: number;

  @IsString()
  @IsOptional()
  runnerType: string;

  @IsNumber()
  distance: number;

  @IsNumber()
  @IsOptional()
  finalResultInMs?: number;

  @IsArray()
  splits: CreateSplitDto[];
}