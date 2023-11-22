import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles.guard';
import { CreateRaceDto } from './dto/create-race.dto';
import { RaceService } from './race.service';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createRace(@Body() dto: CreateRaceDto) {
    return this.raceService.createRace(dto);
  }

  @Get()
  getAllRaces(@Query() queries: any) {
    return this.raceService.getAllRaces(queries);
  }

  @Get('/event')
  getAllRacesForEvent(@Query('eventId') eventId: string) {
    if (!eventId) {
      throw new Error('You have not provided eventId');
    }
    return this.raceService.getAllRacesByEvent(+eventId);
  }

  @Get('/last-matches')
  getLastMatches(
    @Query() query: { runnerId?: string; teamId?: string; managerId?: string },
  ) {
    return this.raceService.getLastMatches(query);
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateRace(
    @Param('id') id: string,
    @Body() body: { teamIds: number[]; startTime: string; eventId: number },
  ) {
    return this.raceService.updateRace(+id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteRace(@Param('id') id: string) {
    return this.raceService.deleteRace(+id);
  }
}