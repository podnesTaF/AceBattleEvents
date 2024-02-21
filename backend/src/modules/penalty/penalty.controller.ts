import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { PenaltyService } from './penalty.service';

@Controller('penalty')
export class PenaltyController {
  constructor(private readonly penaltyService: PenaltyService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createPenalty(@Body() dto: CreatePenaltyDto) {
    return this.penaltyService.createPenalty(dto);
  }

  @Post('/race-team/:raceTeamId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  addPenaltyForRaceTeam(
    @Body() dto: { penaltyId: number },
    @Param('raceTeamId') raceTeamId: number,
  ) {
    return this.penaltyService.addPenaltyToRaceTeam(dto.penaltyId, raceTeamId);
  }
}
