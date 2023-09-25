import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalBestDto } from './create-personal-best.dto';

export class UpdatePersonalBestDto extends PartialType(CreatePersonalBestDto) {}
