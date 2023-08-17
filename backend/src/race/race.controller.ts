import {
  Body,
  Controller,
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
}
