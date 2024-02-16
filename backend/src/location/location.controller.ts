import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles-auth.decorator';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';

@ApiTags('events', 'locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // create location
  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  createLocation(@Body() dto: CreateLocationDto) {
    return this.locationService.createLocation(dto);
  }

  // edit location
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  updateLocation(@Body() dto: CreateLocationDto, @Param('id') id: number) {
    return this.locationService.updateLocation(id, dto);
  }
}
