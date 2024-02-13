import { Body, Controller, Post } from '@nestjs/common';
import { CreateDistanceDto } from '../dto/create-distance.dto';
import { DistanceService } from '../services/distance.service';

@Controller('distances')
export class DistanceController {
  constructor(private readonly distanceService: DistanceService) {}

  @Post()
  createDistance(@Body() dto: CreateDistanceDto) {
    return this.distanceService.createDistance(dto);
  }

  @Post('many')
  createDistances(@Body() dto: CreateDistanceDto[]) {
    return this.distanceService.createDistances(dto);
  }
}
