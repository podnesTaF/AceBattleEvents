import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBestResultDto } from '../dto/create-best-result.dto';
import { BestResultsService } from '../services/best-results.service';

@ApiTags('best-results')
@Controller('best-results')
export class BestResultsController {
  constructor(private readonly bestResultsService: BestResultsService) {}

  @Post()
  createBestResults(@Body() dto: CreateBestResultDto) {
    return this.bestResultsService.createBestResults(dto);
  }
}
