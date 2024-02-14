import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles-auth.decorator';
import {
  AuthenticatedUser,
  GetUser,
} from 'src/users/decorators/user.decorator';
import { RunnerCoachService } from './runner-coach.service';
import { Answer } from './types';

@ApiTags('runner-coaches')
@Controller('runner-coaches')
export class RunnerCoachController {
  constructor(private readonly runnerCoachService: RunnerCoachService) {}

  @Post('/request')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('runner', 'coach')
  requestRunnerCoach(
    @GetUser() user: AuthenticatedUser,
    @Body() body: { runnerId: number; coachId: number },
  ) {
    return this.runnerCoachService.requestRunnerCoach({
      runnerId: body.runnerId,
      coachId: body.coachId,
      initiatorId: user.id,
      initiatorsRoles: user.roles.map((role) => role.name),
    });
  }

  @Post('/answer/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('runner', 'coach')
  acceptRunnerCoach(
    @GetUser() user: AuthenticatedUser,
    @Param('id') id: number,
    @Body() body: { answer: Answer },
  ) {
    return this.runnerCoachService.answerRunnerCoachRequest({
      runnerCoachId: id,
      answer: body.answer,
      answererId: user.id,
    });
  }
}
