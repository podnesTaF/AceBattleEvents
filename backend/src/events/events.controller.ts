import { Storage } from '@google-cloud/storage';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly storage: Storage,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'introImage', maxCount: 1 },
      { name: 'minorImage', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() createEventDto: CreateEventDto) {
    console.log(createEventDto);
    return this.eventsService.create(
      createEventDto,
      files.introImage[0],
      files.minorImage[0],
      this.storage,
    );
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
