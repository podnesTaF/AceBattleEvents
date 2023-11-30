import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamRegistrationDto } from './create-team-registration.dto';

export class UpdateTeamRegistrationDto extends PartialType(CreateTeamRegistrationDto) {}