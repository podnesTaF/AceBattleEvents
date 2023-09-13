import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCoachDto } from 'src/coach/dto/create-coach-dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto, req.user.id);
  }

  @Post('/register')
  @UseGuards(JwtAuthGuard)
  registerTeam(
    @Request() req,
    @Body()
    dto: { teamId: number; eventId: number; txHash: string; wallet: string },
  ) {
    return this.teamsService.register(dto, req.user.id);
  }

  @Get()
  findAll(
    @Request() req,
    @Query()
    queries: {
      gender?: string;
      country?: string;
      name?: string;
      page?: number;
      limit?: number;
      user?: any;
    },
  ) {
    return this.teamsService.findAll(queries, +req?.user?.id);
  }

  @Get('/snippet/:eventId')
  findAllSnippet(@Param('eventId') eventId: string) {
    return this.teamsService.findAllSnippetByEventId(+eventId);
  }

  @Get('/my')
  @UseGuards(JwtAuthGuard)
  findMyTeams(@Request() req: { user?: { id?: number } }) {
    if (!req.user) {
      throw new Error('User not found');
    }
    return this.teamsService.findAllByUser(+req.user.id);
  }

  @Get('/user/:id')
  findUsers(@Param('id') id: string) {
    return this.teamsService.findAllByUser(+id);
  }

  @Get('/registrations')
  @UseGuards(JwtAuthGuard)
  findAllReg(
    @Request() req,
    @Query() query: { limit?: string; page?: string },
  ) {
    return this.teamsService.getRegistrations(+req.user.id, query);
  }

  @Get('/user-registrations')
  @UseGuards(JwtAuthGuard)
  findAllRegByUser(@Request() req) {
    return this.teamsService.getRegistrationsByPlayerId(+req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Get('count')
  count() {
    return this.teamsService.count();
  }

  @Get('count/all')
  countAll() {
    return this.teamsService.countAll();
  }

  @Patch('/personal-bests')
  updatePersonalBests() {
    return this.teamsService.updatePersonalBestsForAllTeams();
  }

  @Patch('/total-points')
  calcuateTotals(@Query('gender') gender?: string) {
    return this.teamsService.calculateTeamsPoints(gender || 'male');
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    dto: {
      name: string;
      city: string;
      gender: string;
      coach: CreateCoachDto;
      players: number[];
    },
  ) {
    return this.teamsService.update(+id, dto);
  }
}
