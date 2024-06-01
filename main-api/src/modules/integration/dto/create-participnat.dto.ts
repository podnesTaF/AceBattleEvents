import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty()
  Bib: string;

  @IsOptional()
  @IsString()
  CreatedBy?: string;

  @IsString()
  @IsNotEmpty()
  Lastname: string;

  @IsString()
  @IsNotEmpty()
  Firstname: string;

  @IsString()
  @IsNotEmpty()
  DateOfBirth: string;

  @IsIn(["m", "f"])
  @IsNotEmpty()
  Sex: "m" | "f";

  @IsString()
  @IsNotEmpty()
  Contest: string;

  @IsOptional()
  @IsString()
  ATF1?: string;
}
