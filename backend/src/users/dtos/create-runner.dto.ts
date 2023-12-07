import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { CreatePersonalBestDto } from "src/bests/dto/create-personal-best.dto";
import { RunnerCategory } from "../entities/runner.entity";

export class CreateRunnerDto {
  @IsString()
  dateOfBirth: string;

  @IsString()
  gender: string;

  @IsString()
  category: RunnerCategory;

  @IsString()
  @IsOptional()
  worldAthleticsUrl: string;

  @IsString()
  managerOption: string;

  @IsNumber()
  @IsOptional()
  manager?: number;

  @IsBoolean()
  runnerAgreement: boolean;

  @IsBoolean()
  informationIsCorrect: boolean;

  @IsArray()
  personalBests: CreatePersonalBestDto[];

  @IsArray()
  seasonBests: CreatePersonalBestDto[];
}
