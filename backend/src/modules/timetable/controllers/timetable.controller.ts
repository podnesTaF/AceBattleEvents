import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateTimetableDto } from '../dto/create-timetable.dto';
import { UpdateTimetableDto } from '../dto/update-timetable.dto';
import { TimetableService } from '../services/timetable.service';

@ApiTags('events', 'timetables')
@Controller('timetables')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createTimetable(@Body() dto: CreateTimetableDto) {
    return this.timetableService.createTimetable(dto);
  }

  // edit timetable
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateTimetable(
    @Body() dto: UpdateTimetableDto,
    @Param('id') id: number,
  ) {
    return this.timetableService.updateTimetable(id, dto);
  }

  // delete timetable
}
