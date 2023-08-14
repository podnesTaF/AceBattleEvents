import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViewerRegistrationsService } from './viewer-registrations.service';
import { CreateViewerRegistrationDto } from './dto/create-viewer-registration.dto';
import { UpdateViewerRegistrationDto } from './dto/update-viewer-registration.dto';

@Controller('viewer-registrations')
export class ViewerRegistrationsController {
  constructor(private readonly viewerRegistrationsService: ViewerRegistrationsService) {}

  @Post()
  create(@Body() createViewerRegistrationDto: CreateViewerRegistrationDto) {
    return this.viewerRegistrationsService.create(createViewerRegistrationDto);
  }

  @Get()
  findAll() {
    return this.viewerRegistrationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewerRegistrationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViewerRegistrationDto: UpdateViewerRegistrationDto) {
    return this.viewerRegistrationsService.update(+id, updateViewerRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewerRegistrationsService.remove(+id);
  }
}
