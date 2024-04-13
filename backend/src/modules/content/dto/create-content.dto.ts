import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsObject()
  @IsOptional()
  mediaUrl: string;

  @IsString()
  @IsOptional()
  purpose: string;

  @IsNumber()
  @IsOptional()
  articleId: number;

  @IsNumber()
  @IsOptional()
  eventId: number;
}
