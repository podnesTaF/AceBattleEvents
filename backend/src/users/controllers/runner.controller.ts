import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles-auth.decorator';
import { AuthenticatedUser, GetUser } from '../decorators/user.decorator';
import { BecomeRunnerDto } from '../dtos/become-runner.dto';
import { RunnerService } from '../services/runner.service';

@ApiTags('runners')
@Controller('runners')
export class RunnerController {
  constructor(private readonly runnerService: RunnerService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('user')
  async becomeRunner(
    @GetUser() user: AuthenticatedUser,
    @Body() body: BecomeRunnerDto,
  ) {
    return this.runnerService.becomeRunner(user.id, body);
  }
}
