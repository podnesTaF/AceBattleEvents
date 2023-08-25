import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Team } from 'src/teams/entities/team.entity';
import { CreateRaceDto } from './dto/create-race.dto';
import { RaceService } from './race.service';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  createRace(@Body() dto: CreateRaceDto) {
    return this.raceService.createRace(dto);
  }

  @Get()
  getAllRaces(@Query() queries: { page: number; limit: number }) {
    return this.raceService.getAllRaces(queries);
  }

  @Get('/event')
  getAllRacesForEvent(@Query('eventId') eventId: string) {
    if (!eventId) {
      throw new Error('You have not provided eventId');
    }
    return this.raceService.getAllRacesByEvent(+eventId);
  }

  @Patch(':id/winner')
  addWinner(
    @Param('id') id: string,
    @Body() { winnerId }: { winnerId: number },
  ) {
    return this.raceService.updateWinner(winnerId, +id);
  }

  @Patch(':id/race')
  updateRace(
    @Param('id') id: string,
    @Body() body: { teams: Team[]; startTime: string },
  ) {
    return this.raceService.updateRace(+id, body.teams, body.startTime);
  }

  @Delete(':id')
  deleteRace(@Param('id') id: string) {
    return this.raceService.deleteRace(+id);
  }
}
