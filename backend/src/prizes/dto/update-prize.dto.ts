import { PartialType } from '@nestjs/mapped-types';
import { CreatePrizeDto } from './create-prize.dto';

export class UpdatePrizeDto extends PartialType(CreatePrizeDto) {}
