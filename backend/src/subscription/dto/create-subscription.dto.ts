import { IsDate, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  userRoleId: number;

  @IsDate()
  startDate: Date;
}
