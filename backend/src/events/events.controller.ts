import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req, @Query() queries: any) {
    return this.eventsService.getAll(queries);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.eventsService.getEventById(+id);
  }
}
