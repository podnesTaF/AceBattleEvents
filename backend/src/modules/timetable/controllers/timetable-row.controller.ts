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
import { CreateTimetableRowDto } from '../dto/create-timetable-row.dto';
import { TimetableRowService } from '../services/timetable-row.service';

@ApiTags('events', 'timetable-rows')
@Controller('timetable-rows')
export class TimetableRowController {
  constructor(private readonly timetableRowService: TimetableRowService) {}

  // add timetable row to timetable
  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createTimetableRow(@Body() dto: CreateTimetableRowDto) {
    return this.timetableRowService.createTimetableRow(dto);
  }

  // edit timetable row
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateTimetableRow(
    @Body() dto: CreateTimetableRowDto,
    @Param('id') id: number,
  ) {
    return this.timetableRowService.updateTimetableRow(id, dto);
  }

  // delete timetable row
}
