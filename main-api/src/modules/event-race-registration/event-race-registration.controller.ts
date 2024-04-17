import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import {
  AuthenticatedUser,
  GetUser,
} from 'src/modules/users/decorators/user.decorator';
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

  // get runner's registrations

  @Get('/user/:id')
  async getRegistrations(@Param('id') id: string) {
    return this.eventRaceRegistrationService.getUserRegistrations(+id);
  }
}
