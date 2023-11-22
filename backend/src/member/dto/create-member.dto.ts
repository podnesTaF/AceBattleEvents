import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreatePersonalBestDto } from 'src/bests/dto/create-personal-best.dto';
import { MemberRole, RunnerCategory } from '../entities/member.entity';

export class CreateMemberDto {
  @IsString()
  role: MemberRole;

  @IsString()
  @IsOptional()
  category: RunnerCategory;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  email: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  dateOfBirth: string;

  @IsString()
  @IsOptional()
  ageRange: string;

  @IsString()
  @IsOptional()
  interest: string;

  @IsBoolean()
  @IsOptional()
  attendBrussels?: boolean;

  @IsBoolean()
  acceptTerms: boolean;

  @IsBoolean()
  acceptNews: boolean;

  @IsArray()
  personalBests: CreatePersonalBestDto[];

  @IsArray()
  seasonBests: CreatePersonalBestDto[];
}