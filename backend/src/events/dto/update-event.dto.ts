import { PartialType } from '@nestjs/mapped-types';
import { Media } from 'src/media/entities/media.entity';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {}

export class UpdateEventInfo extends PartialType(CreateEventDto) {
  title?: string;
  description?: string;
  startDateTime?: string;
  endDate?: string;
}

export class UpdateEventPrizes extends PartialType(CreateEventDto) {
  prizes?: any[];
}

export class UpdateEventMedia {
  introImage?: Media;
  minorImage?: Media;
}
