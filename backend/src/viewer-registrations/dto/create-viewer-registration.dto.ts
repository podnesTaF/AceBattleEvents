import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateViewerRegistrationDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  gender: string;

  @IsBoolean()
  discoveryMethod: string;

  @IsNumber()
  eventId: number;

  @IsNumber()
  @IsOptional()
  viewerId?: number;
}
