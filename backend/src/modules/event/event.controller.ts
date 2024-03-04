import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsQuery } from './dto/get-events-query';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get(':id')
  async getFullEvent(@Param('id') id: number) {
    return this.eventService.getFullEvent(id);
  }

  // create event
  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'mainImage', maxCount: 1 }], {
      limits: {
        fileSize: 4 * 1024 * 1024,
      },
    }),
  )
  async createEvent(
    @UploadedFiles()
    files: { mainImage?: Express.Multer.File[] },
    @Body() dto: CreateEventDto,
  ) {
    return this.eventService.createEvent(dto, files?.mainImage?.[0]);
  }

  // create event type
  @Post('type')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createEventType(@Body() dto: CreateEventTypeDto) {
    return this.eventService.createEventType(dto);
  }

  // add / update location
  @Patch('/:eventId/location')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateLocation(
    @Body() dto: { locationId: number },
    @Param('eventId') eventId: number,
  ) {
    return this.eventService.updateLocation(eventId, dto.locationId);
  }

  // edit event
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateEvent(@Body() dto: UpdateEventDto, @Param('id') id: number) {
    return this.eventService.updateEvent(id, dto);
  }

  // get all events
  @Get()
  findAll(@Query() queries: GetEventsQuery) {
    return this.eventService.getAll(queries);
  }

  // delete event
}
