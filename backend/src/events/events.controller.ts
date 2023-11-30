import { Storage } from "@google-cloud/storage";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { JwtOptionalAuthGuard } from "src/auth/guards/jwt-optional-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles/roles.guard";
import { CreateEventDto } from "./dto/create-event.dto";
import {
  UpdateEventInfo,
  UpdateEventMedia,
  UpdateEventPrizes,
} from "./dto/update-event.dto";
import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly storage: Storage,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto, this.storage);
  }

  @Get()
  findAll(@Query() queries: any) {
    return this.eventsService.getAll(queries);
  }

  @Get("snippet")
  findAllSnippet() {
    return this.eventsService.getAllSnippet();
  }

  @Get("shortform")
  findAllShortform() {
    return this.eventsService.getAllInShort();
  }

  @Get("results/:id")
  findEventResults(@Param("id") id: string) {
    return this.eventsService.getAllResults(+id);
  }

  @Get("info/:id")
  @UseGuards(JwtOptionalAuthGuard)
  findEventInfo(
    @Param("id") id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.eventsService.getEventInfo({
      eventId: +id,
      userId: +req.user.id,
    });
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.eventsService.getEventById(+id);
  }

  @Get("last")
  findLast() {
    return this.eventsService.findLastEvent();
  }

  @Get("count")
  count() {
    return this.eventsService.count();
  }

  @Patch(":id/information")
  updateInformation(@Param("id") id: string, @Body() body: UpdateEventInfo) {
    return this.eventsService.updateInformation(+id, body);
  }

  @Patch(":id/prizes")
  updatePrizes(@Param("id") id: string, @Body() body: UpdateEventPrizes) {
    return this.eventsService.updatePrizes(+id, body);
  }

  @Patch(":id/media")
  updateMedia(@Param("id") id: string, @Body() body: UpdateEventMedia) {
    return this.eventsService.updateMedia(+id, body);
  }

  @Delete(":id")
  deleteEvent(@Param("id") id: string) {
    return this.eventsService.deleteEvent(+id);
  }
}
