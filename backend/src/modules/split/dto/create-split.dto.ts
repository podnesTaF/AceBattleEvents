import { OmitType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateSplitDto {
  @IsNumber()
  readonly raceRunnerId: number;

  @IsNumber()
  readonly distanceInCm: number;

  @IsNumber()
  readonly resultInMs: number;

  @IsBoolean()
  @IsOptional()
  readonly finalSplit: boolean;

  @IsBoolean()
  @IsOptional()
  readonly firstSplit: boolean;
}

export class CreateRaceRunnerSplitDto extends OmitType(CreateSplitDto, [
  'raceRunnerId',
] as const) {}
