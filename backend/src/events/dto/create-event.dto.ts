import { IsArray, IsObject, IsOptional, IsString } from "class-validator";
import { CreateContentDto } from "src/content/dto/create-content.dto";
import { Media } from "src/media/entities/media.entity";
import { CreatePrizeDto } from "src/prizes/dto/create-prize.dto";

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  contents: CreateContentDto[];

  @IsString()
  startDateTime: string;

  @IsString()
  endDate: string;

  @IsString()
  attendanceType: "free" | "paid";

  @IsObject()
  location: {
    country: string;
    city: string;
    zipCode: string;
    address: string;
  };

  @IsArray()
  @IsOptional()
  prizes: CreatePrizeDto[];

  @IsString()
  @IsOptional()
  introImage?: Media;

  @IsString()
  @IsOptional()
  minorImage?: Media;
}
