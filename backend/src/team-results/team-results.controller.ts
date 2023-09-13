import {
  Body,
  Controller,
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
import { CreateTeamResultDto } from './dto/create-team-result.dto';
import { TeamResultsService } from './team-results.service';

@Controller('team-results')
export class TeamResultsController {
  constructor(private readonly teamResultsService: TeamResultsService) {}

  @Post()
  createTeamResults(@Body() dto: CreateTeamResultDto) {
    return this.teamResultsService.create(dto);
  }

  @Get()
  getAllTeamResults(@Query() queries: { limit?: number; page?: number }) {
    return this.teamResultsService.getAllTeamResults(queries);
  }

  @Get('/club/:clubId')
  getClubResults(@Param('clubId') clubId: string, @Query() queries: any) {
    return this.teamResultsService.getClubResults(+clubId, queries);
  }

  @Get('/team/:teamId')
  getTeamResults(
    @Param('teamId') teamId: string,
    @Query() queries: { limit?: number; page?: number },
  ) {
    return this.teamResultsService.getTeamResults(+teamId, queries);
  }

  @Patch('/ranking')
  updateRanking(@Query('gender') gender?: string) {
    return this.teamResultsService.updateRanking(gender || 'male');
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateTeamResult(
    @Param('id') id: string,
    @Body()
    {
      resultInMs,
      teamId,
      oldTeamId,
    }: { resultInMs?: number; teamId?: number; oldTeamId?: number },
  ) {
    return this.teamResultsService.updateTeamTime(
      +id,
      resultInMs,
      teamId,
      oldTeamId,
    );
  }
}
