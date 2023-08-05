import { IsObject, IsString } from 'class-validator';
import { Media } from 'src/media/entities/media.entity';

export class CreateClubDto {
  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsObject()
  logo: Media;
}
