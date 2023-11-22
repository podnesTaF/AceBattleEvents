import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './create-location.dto';

export class updateLocationDto extends PartialType(CreateLocationDto) {
  country?: string;
}