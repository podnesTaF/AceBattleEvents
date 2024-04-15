import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateDistanceDto } from '../dto/create-distance.dto';
import { DistanceService } from '../services/distance.service';

@ApiTags('distances')
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

  @Get('dictionary')
  getDistancesDictionary() {
    return this.distanceService.getDistancesDictionary();
  }
}
