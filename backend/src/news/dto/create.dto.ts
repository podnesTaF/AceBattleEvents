import { IsArray, IsString } from 'class-validator';
import { CreateContentDto } from 'src/content/dto/create-content.dto';
import { Content } from 'src/content/entities/content.entity';
import { Hashtag } from 'src/hashtag/entities/hashtag.entity';

export class CreateNewsDto {
  @IsString()
  readonly title: string;

  @IsArray()
  hashtags: string[];

  @IsArray()
  contents: CreateContentDto[];
}

export class updateNewsDto {
  hashtags?: Hashtag[];
  contents?: Content[];
  title?: string;
}
