import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTeamForEventDto } from './dto/create-team-for-event.dto';
import { TeamForEventService } from './team-for-event.service';

@Controller('team-for-event')
export class TeamForEventController {
  constructor(private readonly teamForEventService: TeamForEventService) {}

  @Post()
  create(@Body() createTeamForEventDto: CreateTeamForEventDto) {
    return this.teamForEventService.create(createTeamForEventDto);
  }

  @Get()
  findAll() {
    return this.teamForEventService.findAll();
  }
}
