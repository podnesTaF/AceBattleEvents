import { IsNumber } from 'class-validator';

export class CreateRegistrationFeeDto {
  @IsNumber()
  eventRaceTypeId: number;

  @IsNumber()
  amount: number;
}
