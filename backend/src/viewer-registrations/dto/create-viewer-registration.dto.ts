import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateViewerRegistrationDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsNumber()
  @IsOptional()
  viewerId?: number;
}
