import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTimetableRowDto } from '../dto/create-timetable-row.dto';
import { TimetableRow } from '../entities/timetable-row.entity';
import { Timetable } from '../entities/timetable.entity';

@Injectable()
export class TimetableRowService {
  constructor(
    @InjectRepository(TimetableRow)
    private readonly timetableRowRepository: Repository<TimetableRow>,
    @InjectRepository(Timetable)
    private readonly timetableRepository: Repository<Timetable>,
  ) {}

  // create timetable row
  async createTimetableRow(dto: CreateTimetableRowDto): Promise<TimetableRow> {
    const timetable = await this.timetableRepository.findOne({
      where: { id: dto.timetableId },
    });

    if (!timetable) {
      throw new NotFoundException('Timetable not found');
    }

    return await this.timetableRowRepository.save({
      ...dto,
    });
  }

  // update timetable row

  async updateTimetableRow(
    id: number,
    dto: CreateTimetableRowDto,
  ): Promise<TimetableRow> {
    const timetableRow = await this.timetableRowRepository.findOne({
      where: { id },
    });

    if (!timetableRow) {
      throw new NotFoundException('Timetable row not found');
    }

    return await this.timetableRowRepository.save({
      ...timetableRow,
      ...dto,
    });
  }
}
