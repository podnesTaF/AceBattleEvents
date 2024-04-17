import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateTeamDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'countryId must be a number' })
  countryId: number;

  @IsString()
  city: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'categoryId must be a number' })
  categoryId: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'genderId must be a number' })
  genderId: number;

  @IsString()
  @IsOptional()
  teamBio: string;
}
