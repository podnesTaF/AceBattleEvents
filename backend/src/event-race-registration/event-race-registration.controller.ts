import { Controller } from '@nestjs/common';
import { EventRaceRegistrationService } from './event-race-registration.service';

@Controller('event-race-registration')
export class EventRaceRegistrationController {
  constructor(
    private readonly eventRaceRegistrationService: EventRaceRegistrationService,
  ) {}

  // create registration for team or individual

  // add payments to the registration and active if paid
}
