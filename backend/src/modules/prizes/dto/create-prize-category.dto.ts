import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreatePrizeCategoryDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  eventId: number;

  @IsObject()
  prizes: {
    place: string;
    amount: number;
  }[];
}
