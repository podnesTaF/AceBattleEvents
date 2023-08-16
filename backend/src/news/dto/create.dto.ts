import { IsArray, IsString } from 'class-validator';
import { CreateContentDto } from 'src/content/dto/create-content.dto';

export class CreateNewsDto {
  @IsString()
  readonly title: string;

  @IsArray()
  hashtags: string[];

  @IsArray()
  contents: CreateContentDto[];
}
