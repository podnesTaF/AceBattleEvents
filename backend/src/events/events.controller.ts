import { Storage } from '@google-cloud/storage';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly storage: Storage,
  ) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto, this.storage);
  }

  @Get()
  findAll(@Query() queries: any) {
    return this.eventsService.getAll(queries);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.eventsService.getEventById(+id);
  }
}
