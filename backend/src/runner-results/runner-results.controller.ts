import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRunnerResultDto } from './dto/create-runner-result.dto';
import { RunnerResultsService } from './runner-results.service';
@Controller('runner-results')
export class RunnerResultsController {
  constructor(private readonly runnerResultsService: RunnerResultsService) {}

  @Post()
  createRunnerResult(@Body() dto: CreateRunnerResultDto) {
    return this.runnerResultsService.create(dto);
  }

  @Get('/user/:userId')
  getUserResults(
    @Param('userId') userId: string,
    @Query()
    queries: {
      limit?: number;
      page?: number;
      category?: string;
      year?: string;
    },
  ) {
    return this.runnerResultsService.getUserResults(+userId, queries);
  }

  @Patch(':id')
  updateRunnerResult(
    @Param('id') id: string,
    @Body() body: { distance?: number; finalResultInMs?: number },
  ) {
    return this.runnerResultsService.updateResult(+id, body);
  }
}
