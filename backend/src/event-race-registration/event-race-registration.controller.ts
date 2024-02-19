import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles-auth.decorator';
import {
  AuthenticatedUser,
  GetUser,
} from 'src/users/decorators/user.decorator';
import {
  CreateEventRaceRegistrationDto,
  CreateEventRaceTeamRegistrationDto,
} from './dto/create-event-race-registration.entity';
import { EventRaceRegistrationService } from './event-race-registration.service';

@Controller('event-race-registrations')
export class EventRaceRegistrationController {
  constructor(
    private readonly eventRaceRegistrationService: EventRaceRegistrationService,
  ) {}

  // create registration for team or individual

  @Post('/team')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coach')
  async createTeamRegistration(
    @GetUser() user: AuthenticatedUser,
    @Body() dto: CreateEventRaceTeamRegistrationDto,
  ) {
    return this.eventRaceRegistrationService.createTeamRegistration(user, dto);
  }

  @Post('/individual')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('runner')
  async createIndividualRegistration(
    @Body() dto: CreateEventRaceRegistrationDto,
    @GetUser() user: AuthenticatedUser,
  ) {
    return this.eventRaceRegistrationService.createIndividualRegistration(
      user,
      dto,
    );
  }

  // add payments to the registration and active if paid
}
