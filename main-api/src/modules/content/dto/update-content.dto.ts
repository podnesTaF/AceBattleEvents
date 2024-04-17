import { IsOptional, IsString } from 'class-validator';

export class UpdateContentDto {
  @IsString()
  @IsOptional()
  text: string;

  @IsString()
  @IsOptional()
  mediaUrl: string;
}
