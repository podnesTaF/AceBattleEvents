import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles-auth.decorator';
import { CreateDistanceDto } from '../dto/create-distance.dto';
import { DistanceService } from '../services/distance.service';

@Controller('distances')
export class DistanceController {
  constructor(private readonly distanceService: DistanceService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  createDistance(@Body() dto: CreateDistanceDto) {
    return this.distanceService.createDistance(dto);
  }

  @Post('many')
  createDistances(@Body() dto: CreateDistanceDto[]) {
    return this.distanceService.createDistances(dto);
  }
}
