import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
}
