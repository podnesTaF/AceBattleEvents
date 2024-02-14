import { Body, Controller, Post } from '@nestjs/common';
import { CreateBestResultDto } from '../dto/create-best-result.dto';
import { BestResultsService } from '../services/best-results.service';

@Controller('best-results')
export class BestResultsController {
  constructor(private readonly bestResultsService: BestResultsService) {}

  @Post()
  createBestResults(@Body() dto: CreateBestResultDto) {
    return this.bestResultsService.createBestResults(dto);
  }
}
