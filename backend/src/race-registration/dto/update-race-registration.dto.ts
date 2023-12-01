import { PartialType } from '@nestjs/mapped-types';
import { CreateRaceRegistrationDto } from './create-race-registration.dto';

export class UpdateRaceRegistrationDto extends PartialType(CreateRaceRegistrationDto) {}