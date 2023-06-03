import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamForEventDto } from './create-team-for-event.dto';

export class UpdateTeamForEventDto extends PartialType(CreateTeamForEventDto) {}
