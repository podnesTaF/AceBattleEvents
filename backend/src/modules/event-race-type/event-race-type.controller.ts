import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateEventRaceTypeDto } from './dto/create-event-race-type.dto';
import { CreateRaceTypeDto } from './dto/create-race-type.dto';
import { CreateRegistrationFeeDto } from './dto/create-registration-fee.dto';
import { EventRaceTypeService } from './event-race-type.service';

@ApiTags('events', 'race-types')
@Controller('event-race-types')
export class EventRaceTypeController {
  constructor(private readonly eventRaceTypeService: EventRaceTypeService) {}

  // create race type
  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createRaceType(@Body() dto: CreateRaceTypeDto) {
    return this.eventRaceTypeService.createRaceType(dto);
  }

  // add race type for the event
  @Post('event/:eventId')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async addRaceTypeToEvent(
    @Body() dto: CreateEventRaceTypeDto,
    @Param('eventId') eventId: number,
  ) {
    return this.eventRaceTypeService.addRaceTypeToEvent(eventId, dto);
  }

  // create registration fee and add it to the event race type
  @Post('/fee')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createRegistrationFee(@Body() dto: CreateRegistrationFeeDto) {
    return this.eventRaceTypeService.createRegistrationFee(dto);
  }
  // remove race type from the event
}
