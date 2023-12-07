import { IsString } from "class-validator";

export class CreatePersonalBestDto {
  @IsString()
  distanceInCm: string;

  @IsString()
  result: string;
}
