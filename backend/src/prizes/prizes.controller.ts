import { Body, Controller, Post } from '@nestjs/common';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { PrizesService } from './prizes.service';

@Controller('prizes')
export class PrizesController {
  constructor(private readonly prizesService: PrizesService) {}

  @Post()
  create(@Body() createPrizeDto: CreatePrizeDto) {
    return this.prizesService.create(createPrizeDto);
  }
}
