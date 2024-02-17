import { IsNumber } from 'class-validator';

export class CreateEventRaceRegistrationDto {
  @IsNumber()
  readonly eventRaceTypeId: number;

  @IsNumber()
  readonly feeId: number;

  @IsNumber()
  readonly teamId: number;
}
