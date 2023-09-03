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

  @Get('/full-race/:id')
  getFullRace(@Param('id') id: string) {
    return this.raceService.getFullRace(+id);
  }

  @Get(':id')
  getRace(@Param('id') id: string) {
    return this.raceService.getRace(+id);
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
    @Body() body: { teamIds: number[]; startTime: string; eventId: number },
  ) {
    return this.raceService.updateRace(+id, body);
  }

  @Delete(':id')
  deleteRace(@Param('id') id: string) {
    return this.raceService.deleteRace(+id);
  }
}
