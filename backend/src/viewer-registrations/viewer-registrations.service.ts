import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sgMail from '@sendgrid/mail';
import axios from 'axios';
import { config as evnconfig } from 'dotenv';
import * as qrcode from 'qrcode';
import { Event } from 'src/events/entities/event.entity';
import { FileService, FileType } from 'src/file/file.service';
import { storage } from 'src/file/google-cloud-storage.config';
import { Location } from 'src/locations/entities/locations.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateViewerRegistrationDto } from './dto/create-viewer-registration.dto';
import { UpdateViewerRegistrationDto } from './dto/update-viewer-registration.dto';
import { ViewerRegistration } from './entities/viewer-registration.entity';
import { successRegisterTemplate } from './utils/getMessageTemplate';
evnconfig();

export const getGoogleMapsLink = (location: Location) => {
  return `https://www.google.com/maps/search/?api=1&query=${location.address}+${location.city}+${location.country.name}`;
};

@Injectable()
export class ViewerRegistrationsService {
  constructor(
    @InjectRepository(ViewerRegistration)
    private repository: Repository<ViewerRegistration>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private viewerRepository: Repository<User>,
    private fileService: FileService,
  ) {
    sgMail.setApiKey(process.env.SEND_GRID_API_K);
  }

  async create(createViewerRegistrationDto: CreateViewerRegistrationDto) {
    let viewer: User;
    if (createViewerRegistrationDto.viewerId) {
      viewer = await this.viewerRepository.findOne({
        where: { id: createViewerRegistrationDto.viewerId },
      });
    }

    const event = await this.eventRepository.findOne({
      where: { id: createViewerRegistrationDto.eventId },
      relations: ['location', 'location.country'],
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const isUnique = await this.checkIfUnique(
      createViewerRegistrationDto.email,
      event.id,
    );

    if (!isUnique) {
      throw new BadRequestException('Email already registered for this event');
    }

    const qrCodeData = `eventId:${event.id};email:${createViewerRegistrationDto.email}`;

    const qrCodeBuffer = await qrcode.toBuffer(qrCodeData);

    const qrCodeFileName = `qrcode-event-${event.id}-user-${createViewerRegistrationDto.email}.png`;

    const qr = await this.fileService.uploadFileToStorage(
      FileType.QRCODE,
      qrCodeBuffer,
      qrCodeFileName,
      storage,
    );

    if (!qr) {
      throw new Error('Error uploading QR code');
    }

    const registration = await this.repository.save({
      ...createViewerRegistrationDto,
      event,
      viewer,
      qrcode: qr,
    });

    const ticket = await this.fileService.generatePDFforViewer(
      event,
      registration,
      qr,
      storage,
    );

    if (!ticket) {
      throw new Error('Error generating ticket');
    } else {
      registration.ticket = ticket;
      await this.repository.save(registration);
    }

    const { data: ticketData } = await axios.get(ticket.mediaUrl, {
      responseType: 'arraybuffer',
    });

    const ticketBuffer = Buffer.from(ticketData);

    const msg = {
      to: createViewerRegistrationDto.email,
      from: 'it.podnes@gmail.com', // Set your sender email
      subject: 'Welcome to the Event!',
      html: successRegisterTemplate(event, registration),
      attachments: [
        {
          content: ticketBuffer.toString('base64'),
          filename: ticket.title + '.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };

    try {
      const res = await sgMail.send(msg);
    } catch (error) {
      console.log('error sending email', error.message);
    }

    return registration;
  }

  async checkIfUnique(email: string, eventId: number) {
    const registrations = await this.repository.find({
      where: { email },
      relations: ['event'],
    });

    if (
      registrations.length &&
      registrations.some((reg) => reg.event.id === eventId)
    ) {
      return false;
    }
    return true;
  }

  findAll() {
    return `This action returns all viewerRegistrations`;
  }

  findMyRegistrations(id: number) {
    const qb = this.repository
      .createQueryBuilder('vr')
      .leftJoinAndSelect('vr.event', 'event')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoinAndSelect('vr.viewer', 'viewer')
      .where('viewer.id = :id', { id })
      .orderBy('event.startDateTime', 'DESC');

    return qb.getMany();
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
