import { PartialType } from '@nestjs/mapped-types';
import { CreateClubRequestDto } from './create-club-request.dto';

export class UpdateClubRequestDto extends PartialType(CreateClubRequestDto) {}
