import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClubRequestsService } from './club-requests.service';
import { CreateClubRequestDto } from './dto/create-club-request.dto';
import { UpdateClubRequestDto } from './dto/update-club-request.dto';

@Controller('club-requests')
export class ClubRequestsController {
  constructor(private readonly clubRequestsService: ClubRequestsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createClubRequestDto: CreateClubRequestDto) {
    return this.clubRequestsService.create(createClubRequestDto, +req.user.id);
  }

  @Get('club/:id')
  findAllByClubId(@Param('id') id: string) {
    return this.clubRequestsService.getJoinRequestsForClub(+id);
  }

  @Post('club/:id/accept')
  @UseGuards(JwtAuthGuard)
  acceptJoinRequest(
    @Param('id') id: string,
    @Body() { userId }: { userId: number },
  ) {
    return this.clubRequestsService.acceptJoinRequest(+id, userId);
  }

  @Post('club/:id/decline')
  @UseGuards(JwtAuthGuard)
  declineJoinRequest(
    @Param('id') id: string,
    @Body() { userId }: { userId: number },
  ) {
    return this.clubRequestsService.declineJoinRequest(+id, userId);
  }

  @Get()
  findAll() {
    return this.clubRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClubRequestDto: UpdateClubRequestDto,
  ) {
    return this.clubRequestsService.update(+id, updateClubRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubRequestsService.remove(+id);
  }
}
