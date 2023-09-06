import { IsArray, IsObject, IsString } from 'class-validator';
import { CreateContentDto } from 'src/content/dto/create-content.dto';
import { Content } from 'src/content/entities/content.entity';
import { Hashtag } from 'src/hashtag/entities/hashtag.entity';
import { Media } from 'src/media/entities/media.entity';

export class CreateNewsDto {
  @IsString()
  readonly title: string;

  @IsObject()
  mainImage: Media;

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
