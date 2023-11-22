import { Controller, Get, Param, Patch } from '@nestjs/common';
import { updateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get(':id')
  getLocationByEvent(@Param('id') id: string) {
    return this.locationsService.findLocation(+id);
  }

  @Patch(':id')
  updateLocation(@Param('id') id: string, body: updateLocationDto) {
    return this.locationsService.updateLocation(+id, body);
  }
}