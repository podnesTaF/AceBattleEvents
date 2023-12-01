import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamRaceRunnerService } from './team-race-runner.service';
import { CreateTeamRaceRunnerDto } from './dto/create-team-race-runner.dto';
import { UpdateTeamRaceRunnerDto } from './dto/update-team-race-runner.dto';

@Controller('team-race-runner')
export class TeamRaceRunnerController {
  constructor(private readonly teamRaceRunnerService: TeamRaceRunnerService) {}

  @Post()
  create(@Body() createTeamRaceRunnerDto: CreateTeamRaceRunnerDto) {
    return this.teamRaceRunnerService.create(createTeamRaceRunnerDto);
  }

  @Get()
  findAll() {
    return this.teamRaceRunnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamRaceRunnerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamRaceRunnerDto: UpdateTeamRaceRunnerDto) {
    return this.teamRaceRunnerService.update(+id, updateTeamRaceRunnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamRaceRunnerService.remove(+id);
  }
}