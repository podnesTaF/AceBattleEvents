import { Controller, Get, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get(':id')
  getLocationByEvent(@Param('id') id: string) {
    return this.locationsService.findLocation(+id);
  }
}
