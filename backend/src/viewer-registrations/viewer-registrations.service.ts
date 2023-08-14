import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Repository } from 'typeorm';
import { CreateViewerRegistrationDto } from './dto/create-viewer-registration.dto';
import { UpdateViewerRegistrationDto } from './dto/update-viewer-registration.dto';
import { ViewerRegistration } from './entities/viewer-registration.entity';

@Injectable()
export class ViewerRegistrationsService {
  constructor(
    @InjectRepository(ViewerRegistration)
    private repository: Repository<ViewerRegistration>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(createViewerRegistrationDto: CreateViewerRegistrationDto) {
    const event = await this.eventRepository.findOne({
      where: { id: createViewerRegistrationDto.eventId },
    });

    if (!event) {
      throw new Error('Event not found');
    }
    return this.repository.save({
      ...createViewerRegistrationDto,
      event,
    });
  }

  findAll() {
    return `This action returns all viewerRegistrations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} viewerRegistration`;
  }

  update(id: number, updateViewerRegistrationDto: UpdateViewerRegistrationDto) {
    return `This action updates a #${id} viewerRegistration`;
  }

  remove(id: number) {
    return `This action removes a #${id} viewerRegistration`;
  }
}
