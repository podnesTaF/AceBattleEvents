import { IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  previewImageUrl: string;
}
