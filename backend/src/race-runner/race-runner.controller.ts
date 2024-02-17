import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles-auth.decorator';
import { CreateRaceParticipantDto } from './dto/create-race-runner.dto';
import { RaceRunnerService } from './race-runner.service';

@Controller('race-runners')
export class RaceRunnerController {
  constructor(private readonly raceRunnerService: RaceRunnerService) {}

  // add many runners for a race or for a team
  @Post('/race/:id/add-many')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async addRunner(
    @Param('id') raceId: number,
    @Body() dto: CreateRaceParticipantDto[],
    @Query('teamId') teamId?: number,
  ) {
    return this.raceRunnerService.addRaceRunners(raceId, dto, teamId);
  }

  // remove race runner
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async removeRaceRunner(@Param('id') id: number) {
    return this.raceRunnerService.removeRaceRunner(id);
  }
}
