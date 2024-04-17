import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsOptional()
  mainImage?: Express.Multer.File | null;
  @IsOptional()
  introImage: Express.Multer.File | null;
}
