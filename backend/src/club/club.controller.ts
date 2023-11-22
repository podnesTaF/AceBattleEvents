import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Media } from 'src/media/entities/media.entity';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';

@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createClubDto: CreateClubDto) {
    return this.clubService.create(createClubDto, +req.user.id);
  }

  @Get()
  findAll(@Query() queries: any) {
    return this.clubService.findAll(queries);
  }

  @Get('preview')
  findClubsPreview() {
    return this.clubService.findAllPreview();
  }

  @Get('snippet')
  findAllSnippet() {
    return this.clubService.findAllSnippet();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubService.findOne(+id);
  }

  @Get(':id/races')
  findFinishedRacesByClub(@Param('id') id: string) {
    return this.clubService.findFinishedRacesByClub(+id);
  }

  @Patch(':id/club-data')
  update(
    @Param('id') id: string,
    @Body()
    dto: {
      name?: string;
      city?: string;
      country?: string;
      logo?: Media;
      photo?: Media;
    },
  ) {
    return this.clubService.update(+id, dto);
  }

  @Post(':id/handle-favorite')
  @UseGuards(JwtAuthGuard)
  like(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { action: string },
  ) {
    return this.clubService.handleFavorite(+req.user.id, +id, body.action);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubService.remove(+id);
  }

  @Patch(':id/kick-members')
  @UseGuards(JwtAuthGuard)
  kickMembers(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { userIds: number[] },
  ) {
    return this.clubService.kickMembers(+req.user.id, +id, body.userIds);
  }

  @Post(':id/leave')
  @UseGuards(JwtAuthGuard)
  leaveClub(@Request() req, @Param('id') id: string) {
    return this.clubService.leaveClub(+req.user.id, +id);
  }
}