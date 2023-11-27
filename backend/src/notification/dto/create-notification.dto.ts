import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateContentDto } from "src/content/dto/create-content.dto";

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsArray()
  @IsNotEmpty()
  contents: CreateContentDto[];

  @IsArray()
  @IsOptional()
  receivers: number[];
}
