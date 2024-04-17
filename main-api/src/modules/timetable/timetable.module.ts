import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/modules/event/entities/event.entity';
import { TimetableRowController } from './controllers/timetable-row.controller';
import { TimetableController } from './controllers/timetable.controller';
import { TimetableRow } from './entities/timetable-row.entity';
import { Timetable } from './entities/timetable.entity';
import { TimetableRowService } from './services/timetable-row.service';
import { TimetableService } from './services/timetable.service';

@Module({
  imports: [TypeOrmModule.forFeature([Timetable, TimetableRow, Event])],
  controllers: [TimetableController, TimetableRowController],
  providers: [TimetableService, TimetableRowService],
})
export class TimetableModule {}
