import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateUserRoleDto {
  @IsNumber()
  roleId: number;

  @IsNumber()
  userId: number;
}

export class CreateUserRoleSubscription extends CreateUserRoleDto {
  @IsString()
  subscriptionStatus: string;

  @IsString()
  stripeSubscriptionId: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
