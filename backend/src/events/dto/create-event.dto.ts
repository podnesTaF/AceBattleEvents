import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { CreatePrizeDto } from 'src/prizes/dto/create-prize.dto';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  startDateTime: string;

  @IsString()
  endDate: string;

  @IsObject()
  location: {
    country: string;
    city: string;
    zipCode: string;
    address: string;
  };

  @IsArray()
  prizes: CreatePrizeDto[];

  @IsString()
  @IsOptional()
  introImageUrl?: string;

  @IsString()
  @IsOptional()
  minorImageUrl?: string;
}
