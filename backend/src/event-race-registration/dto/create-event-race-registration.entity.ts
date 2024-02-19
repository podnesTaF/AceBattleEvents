import { IsNumber } from 'class-validator';

export class CreateEventRaceRegistrationDto {
  @IsNumber()
  readonly eventRaceTypeId: number;

  @IsNumber()
  readonly feeId: number;
}

export class CreateEventRaceTeamRegistrationDto extends CreateEventRaceRegistrationDto {
  @IsNumber()
  readonly teamId: number;
}
