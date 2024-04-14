import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from 'src/modules/gender/entities/gender.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import {
  TimetableByDay,
  mapTimeTableByRows,
} from 'src/modules/timetable/utils/helpers';
import { formatDate } from 'src/utils/date-formater';
import { Repository } from 'typeorm';
import { FileService } from '../../file/file.service';
import { CreateEventTypeDto } from '../dto/create-event-type.dto';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventType } from '../entities/event-type.entity';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventType)
    private readonly eventTypeRepository: Repository<EventType>,
    private readonly fileService: FileService,
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  // get full event

  async getFullEvent(
    eventCode: string,
  ): Promise<Event & { timetableByDays: TimetableByDay[] }> {
    const event = await this.eventRepository.findOne({
      where: { eventCode },
      relations: [
        'location',
        'location.country',
        'contents',
        'prizeCategories.prizes',
        'type',
        'timetables.rows',
        'eventRaceTypes.raceType',
        'timetables.rows',
      ],
    });

    const activeTimetable = event.timetables?.find((t) => t.active);
    const timetableByDays =
      activeTimetable && mapTimeTableByRows(activeTimetable);
    delete event.timetables;
    return { ...event, timetableByDays };
  }

  async createEvent(
    dto: CreateEventDto,
    mainImage: Express.Multer.File,
  ): Promise<Event> {
    const event = await this.eventRepository.save({
      ...dto,
    });

    if (mainImage) {
      const url = await this.uploadEventMedia(event.id, mainImage, 'mainImage');
      event.mainImageUrl = url;
      return await this.eventRepository.save(event);
    }

    return event;
  }

  uploadEventMedia(
    eventId: number,
    file: Express.Multer.File,
    type: string,
    oldMediaName?: string,
  ) {
    return this.fileService.uploadFileToStorage(
      file.originalname,
      `events/${type}/${eventId}`,
      file.mimetype,
      file.buffer,
      { mediaName: file.originalname, contentType: file.mimetype },
      oldMediaName,
    );
  }

  // create event type
  async createEventType(dto: CreateEventTypeDto): Promise<EventType> {
    return await this.eventTypeRepository.save({
      ...dto,
    });
  }

  // update event location
  async updateLocation(eventId: number, locationId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    event.locationId = locationId;
    return await this.eventRepository.save(event);
  }

  async getPreviews(query: { finished?: boolean }) {
    const qb = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoinAndSelect('location.country', 'country');

    if (query.finished) {
      qb.where('event.endDate < :now', { now: new Date() });
    }

    qb.orderBy('event.startDateTime', 'DESC');

    const events = await qb.getMany();

    return { events };
  }

  async getResults(eventCode: string) {
    const event = await this.eventRepository.findOne({
      where: { eventCode },
      relations: [
        'eventRaceTypes',
        'eventRaceTypes.raceType',
        'eventRaceTypes.races',
        'eventRaceTypes.races.winner',
        'eventRaceTypes.races.raceTeams.team.gender',
      ],
    });

    if (!event) throw new NotFoundException('Event not found');

    const genders = await this.genderRepository.find();

    const returnData: {
      notFinished: boolean;
      eventTitle: string;
      mainImageUrl?: string;
      eventRaceTypesResults: {
        id: number;
        raceType: {
          id: number;
          name: string;
        };
        racesByType: {
          [type: string]: {
            id: number;
            name: string;
            startTime: string;
          }[];
        };
        topForCategories: {
          gender: Gender;
          top: {
            place: number;
            team: Team;
            wins: number;
            bestTimeInMs: number;
          }[];
        }[];
      }[];
    } = {
      notFinished: false,
      eventTitle: event.title,
      mainImageUrl: event.mainImageUrl,
      eventRaceTypesResults: [],
    };

    if (event.startDateTime > new Date()) {
      return {
        notFinished: true,
        eventTitle: event.title,
        mainImageUrl: event.mainImageUrl,
      };
    }

    returnData.eventRaceTypesResults = event.eventRaceTypes.map(
      (eventRaceType) => {
        const raceType = eventRaceType.raceType;

        const racesByType: {
          [key: string]: {
            id: number;
            name: string;
            startTime: any;
          }[];
        } = {};

        const topForCategories = genders.map((g) => {
          const categoryRaces = eventRaceType.races.filter((r) =>
            r.raceTeams.some((rt) => rt.team.gender.id === g.id),
          );

          categoryRaces.forEach((r) => {
            if (!racesByType[g.name]) {
              racesByType[g.name] = [];
            }

            racesByType[g.name].push({
              id: r.id,
              name: r.name,
              startTime: r.startTime,
            });
          });

          const participants = categoryRaces
            .map((r) => r.raceTeams)
            .flat()
            .reduce(
              (
                acc: {
                  [key: number]: {
                    team: Team;
                    wins: number;
                    bestTimeInMs: number;
                  };
                },
                rt,
              ) => {
                if (!acc[rt.team.id]) {
                  acc[rt.team.id] = {
                    team: rt.team,
                    wins: 0,
                    bestTimeInMs: Infinity,
                  };
                }

                acc[rt.team.id].bestTimeInMs = Math.min(
                  rt.totalTimeInMs,
                  acc[rt.team.id].bestTimeInMs,
                );
                if (rt.won) {
                  acc[rt.team.id].wins++;
                }
                return acc;
              },
              {},
            );

          // Sort by wins and then by time

          const top = Object.values(participants)
            .sort((a, b) => {
              if (a.wins === b.wins) {
                return a.bestTimeInMs - b.bestTimeInMs;
              }
              return b.wins - a.wins;
            })
            .map((p, i) => ({
              place: i + 1,
              team: p.team,
              wins: p.wins,
              bestTimeInMs: p.bestTimeInMs,
            }));

          return {
            gender: g,
            top,
          };
        });

        return {
          id: eventRaceType.id,
          raceType: {
            id: raceType.id,
            name: raceType.name,
          },
          racesByType,
          topForCategories,
        };
      },
    );

    return returnData;
  }

  async getAllInShort() {
    const events = await this.eventRepository.find({
      select: ['id', 'title', 'startDateTime', 'mainImageUrl', 'eventCode'],
    });
    return events.map((event) => ({
      ...event,
      startDateTime: formatDate(event.startDateTime),
    }));
  }

  // update event information
  async updateEvent(eventId: number, dto: UpdateEventDto): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (dto.introImage) {
      const url = await this.fileService.uploadFileToStorage(
        dto.introImage.originalname,
        `/events/`,
        dto.introImage.mimetype,
        dto.introImage.buffer,
        {
          mediaName: dto.introImage.originalname,
          contentType: dto.introImage.mimetype,
        },
        event.introImageUrl,
      );

      event.introImageUrl = url;
    }

    if (dto.mainImage) {
      const url = await this.fileService.uploadFileToStorage(
        dto.mainImage.originalname,
        `/events/`,
        dto.mainImage.mimetype,
        dto.mainImage.buffer,
        {
          mediaName: dto.mainImage.originalname,
          contentType: dto.mainImage.mimetype,
        },
        event.mainImageUrl,
      );

      event.mainImageUrl = url;
    }

    if (dto.mainImage === null) {
      event.mainImageUrl = null;
    }

    if (dto.introImage === null) {
      event.introImageUrl = null;
    }

    event.title = dto.title || event.title;
    event.subtitle = dto.subtitle || event.subtitle;
    event.startDateTime = dto.startDateTime || event.startDateTime;
    event.endDate = dto.endDate || event.endDate;
    event.typeId = dto.typeId || event.typeId;

    return await this.eventRepository.save(event);
  }

  // get all events
  async getAll(query: any) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 5;

    const qb = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.introImage', 'introImage')
      .leftJoinAndSelect('event.minorImage', 'minorImage')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoinAndSelect('location.country', 'country')
      .leftJoin('event.teams', 'team')
      .loadRelationCountAndMap('event.teamsCount', 'event.teams')
      .leftJoinAndSelect('event.prizes', 'prize')
      .orderBy('event.id', 'DESC');

    if (query.month) {
      const month = query.month.toLowerCase();
      const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1; // Get the month index (1-12)
      qb.where('EXTRACT(MONTH FROM event.startDateTime) = :monthIndex', {
        monthIndex,
      });
    }

    if (query.year) {
      const year = +query.year;
      if (!isNaN(year)) {
        qb.andWhere('YEAR(event.startDateTime) = :year', { year });
      }
    }

    if (query.name) {
      qb.andWhere('event.title LIKE :name', { name: `%${query.name}%` });
    }

    if (query.country) {
      qb.andWhere('country.name LIKE :country', {
        country: `%${query.country}%`,
      });
    }

    if (query.finished) {
      qb.andWhere('event.endDate < :now', { now: new Date() });
    } else {
      qb.andWhere('event.endDate > :now', { now: new Date() });
    }

    const totalItems = await qb.getCount();

    const totalPages = Math.ceil(totalItems / limit);

    qb.skip((page - 1) * limit).take(limit);

    const events = await qb.getMany();

    return { events, totalPages };
  }
}
