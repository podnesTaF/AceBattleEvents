import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
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

  @Get()
  async getRunners(
    @Query()
    query: {
      page?: number;
      limit?: number;
      search?: string;
      teamId?: number;
      countryId?: number;
      genderId?: number;
      categoryId?: number;
    },
  ) {
    return this.runnerService.getRunners(query);
  }

  @Get('/top')
  getTopRunners(
    @Query() queries: { count: number; gender?: 'male' | 'female' },
  ) {
    return this.runnerService.getTopRunners(queries);
  }

  @Get('/:id/teams')
  async getRunnerTeams(@Param('id') id: string) {
    return this.runnerService.getRunnerTeams(+id);
  }

  @Get('/:id')
  async getRunner(@Param('id') id: string) {
    return this.runnerService.getRunnerInfo(id);
  }
}
