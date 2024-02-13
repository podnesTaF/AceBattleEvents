import { IsOptional, IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  name: string;

  @IsString()
  phoneCode: string;

  @IsString()
  @IsOptional()
  shortName?: string;

  @IsString()
  @IsOptional()
  flagIconUrl?: string;
}
