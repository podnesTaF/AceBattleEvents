import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateRaceRunnerSplitDto } from 'src/modules/split/dto/create-split.dto';
import { AuthenticatedUser, GetUser } from '../users/decorators/user.decorator';
import { CreateRaceParticipantDto } from './dto/create-race-runner.dto';
import { CreateRunnerRoleDto } from './dto/create-runner-role.dto';
import { CreateRunnerStatusDto } from './dto/create-runner-status.dto';
import { RaceRunnerService } from './race-runner.service';

@Controller('race-runners')
export class RaceRunnerController {
  constructor(private readonly raceRunnerService: RaceRunnerService) {}

  // add many runners for a race or for a race team
  @Post('/race/:id/add-many')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async addRunner(
    @Param('id') raceId: number,
    @Body() dto: CreateRaceParticipantDto[],
    @Query('raceTeamId') raceTeamId?: number,
  ) {
    return this.raceRunnerService.addRaceRunners(raceId, dto, raceTeamId);
  }

  @Get('/qrcode/:token')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async readQrcodeInfo(@Param('token') raceToken: string) {
    return this.raceRunnerService.readQrcode(raceToken);
  }

  @Get('/:id/qrcode')
  @UseGuards(RolesGuard)
  @Roles('runner', 'admin')
  async getRaceRunnerQrCode(
    @GetUser() user: AuthenticatedUser,
    @Param('id') raceRunnerId: number,
  ) {
    return this.raceRunnerService.getQrCodeForRaceRunner(user, raceRunnerId);
  }

  @Post('/:id/confirm')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async confirmRaceRunnerParticipation(@Param('id') raceRunnerId: number) {
    return this.raceRunnerService.confirmParticipation(raceRunnerId);
  }

  // remove race runner
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async removeRaceRunner(@Param('id') id: number) {
    return this.raceRunnerService.removeRaceRunner(id);
  }

  // Add splits and finish the raceRunner
  @Post(':id/finish')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async finishRaceRunner(
    @Param('id') id: number,
    @Body() splits: CreateRaceRunnerSplitDto[],
  ) {
    return this.raceRunnerService.finishRaceRunner(id, splits);
  }

  @Post('role')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createRunnerRole(@Body() dto: CreateRunnerRoleDto) {
    return this.raceRunnerService.createRunnerRole(dto);
  }

  @Post('status')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createRunnerStatus(@Body() dto: CreateRunnerStatusDto) {
    return this.raceRunnerService.createRunnerStatus(dto);
  }
}
