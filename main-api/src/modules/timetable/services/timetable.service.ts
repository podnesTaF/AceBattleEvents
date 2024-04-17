import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/modules/event/entities/event.entity';
import { Repository } from 'typeorm';
import { CreateTimetableDto } from '../dto/create-timetable.dto';
import { UpdateTimetableDto } from '../dto/update-timetable.dto';
import { TimetableRow } from '../entities/timetable-row.entity';
import { Timetable } from '../entities/timetable.entity';

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(Timetable)
    private readonly timetableRepository: Repository<Timetable>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(TimetableRow)
    private readonly timetableRowRepository: Repository<TimetableRow>,
  ) {}

  // create timetable, assign to event. Invalidate previous timetables
  async createTimetable(dto: CreateTimetableDto): Promise<Timetable> {
    const event = await this.eventRepository.findOne({
      where: { id: dto.eventId, active: true },
    });

    if (!event) {
      throw new NotFoundException('Active event by provided id not found');
    }

    // invalidate previous timetables
    await this.timetableRepository.update(
      { eventId: dto.eventId, active: true },
      { active: false, validUntil: new Date() },
    );

    const timetable = await this.timetableRepository.save({
      ...dto,
    });

    // create rows

    const rows = await Promise.all(
      dto.timetableRows.map((row) =>
        this.timetableRowRepository.save({ ...row, timetableId: timetable.id }),
      ),
    );

    timetable.timetableRows = rows;

    return await this.timetableRepository.save(timetable);
  }

  // update timetable
  async updateTimetable(
    id: number,
    dto: UpdateTimetableDto,
  ): Promise<Timetable> {
    const timetable = await this.timetableRepository.findOne({
      where: { id },
    });

    if (!timetable) {
      throw new NotFoundException('Timetable not found');
    }

    return await this.timetableRepository.save({
      ...timetable,
      ...dto,
    });
  }
}
