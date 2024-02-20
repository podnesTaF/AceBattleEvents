import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class UpdatableRaceFields {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsDateString()
  readonly startTime: Date;

  @IsBoolean()
  readonly published: boolean;

  @IsBoolean()
  readonly finished: boolean;
}

export class UpdateRaceDto extends PartialType(UpdatableRaceFields) {}
