import { IsArray, IsNumber } from 'class-validator';
import { CreateSplitDto } from 'src/splits/dto/create-split.dto';

export class CreateRunnerResultDto {
  @IsNumber()
  teamResultId: number;

  @IsNumber()
  runnerId: number;

  @IsNumber()
  distance: number;

  @IsNumber()
  finalResultInMs: number;

  @IsArray()
  splits: CreateSplitDto[];
}
