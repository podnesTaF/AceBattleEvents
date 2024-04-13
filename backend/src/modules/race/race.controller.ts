import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { RaceService } from './race.service';

@Controller('races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  // create races for event race type
  @Post('/event-race-type/:eventRaceTypeId')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createRace(
    @Body() dto: CreateRaceDto[],
    @Param('eventRaceTypeId') eventRaceTypeId: number,
  ) {
    return this.raceService.createRace(eventRaceTypeId, dto);
  }

  @Get(':id')
  async getRace(@Param('id') id: number) {
    return this.raceService.getFullRace(id);
  }

  // Automatically create races based on the registrations for the event race type.
  // This should be done after the registration is closed.
  // Admin can run this manually. He have to enter the start time and the time between races.
  // He can then adjust the startTime.

  // Update
  @Patch('/:raceId')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateRace(
    @Param('raceId') raceId: number,
    @Body() dto: UpdateRaceDto,
  ) {
    return this.raceService.updateRace(raceId, dto);
  }

  // Remove race from the event
}
