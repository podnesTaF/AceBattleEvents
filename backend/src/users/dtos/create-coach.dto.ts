import { IsNumber } from "class-validator";

export class CreateCoachDto {
  @IsNumber()
  managerId: number;
}
