import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles-auth.decorator';
import { AuthenticatedUser, GetUser } from '../users/decorators/user.decorator';
import { AnswerJoinRequestDto } from './dto/answer-join-request.dto';
import { CreateJoinRequestDto } from './dto/create-join-request.dto';
import { JoinRequestService } from './join-request.service';

@Controller('join-requests')
export class JoinRequestController {
  constructor(private readonly joinRequestService: JoinRequestService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coach', 'runner')
  async createJoinRequest(
    @GetUser() user: AuthenticatedUser,
    @Body() dto: CreateJoinRequestDto,
  ) {
    return this.joinRequestService.createJoinRequest(user, dto);
  }

  @Patch(':id/answer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coach', 'runner')
  async answerJoinRequest(
    @GetUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: AnswerJoinRequestDto,
  ) {
    return this.joinRequestService.answerJoinRequest(user, +id, dto);
  }

  @Post('deactivate-expired-requests')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async deactivateExpiredRequstsManualy() {
    return this.joinRequestService.deactivateExpiredRequests();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('runner', 'coach', 'admin')
  async deleteJoinRequest(
    @GetUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    return this.joinRequestService.deleteJoinRequest(user, +id);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deactivateExpiredRequests() {
    await this.joinRequestService.deactivateExpiredRequests();
  }
}
