import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsString()
  @IsOptional()
  purpose: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  @IsOptional()
  articleId: number;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  @IsOptional()
  eventId: number;
}
