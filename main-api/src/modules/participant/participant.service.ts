import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as qrcode from "qrcode";
import { In, Repository } from "typeorm";
import { EventRaceRegistration } from "../event-race-registration/entities/event-race-registration.entity";
import { RegistrationType } from "../event-race-registration/entities/registration-type.entity";
import { EventRaceType } from "../event-race-type/entities/event-race-type.entity";
import { FileService } from "../file/file.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { Participant } from "./entities/participant.entity";
import { generateUniqueBibNumber } from "./utils/helpers";

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
    @InjectRepository(EventRaceRegistration)
    private eventRaceRegistrationRepository: Repository<EventRaceRegistration>,
    @InjectRepository(EventRaceType)
    private eventRaceTypeRepository: Repository<EventRaceType>,
    @InjectRepository(RegistrationType)
    private registrationTypeRepository: Repository<RegistrationType>,
    private readonly fileService: FileService,
  ) {}

  async createParticipant(dto: CreateParticipantDto): Promise<Participant> {
    const { eventCategoryIds, ...participantData } = dto;

    // check if the participant is unique by email and event categories

    const isUnique = await this.isUnique({
      email: participantData.email,
      eventRaceTypeIds: eventCategoryIds,
    });

    if (!isUnique) {
      throw new Error("Participant already exists");
    }

    const takenBibNumbers = await this.participantRepository.find({
      select: ["bibNumber"],
    });

    const bibNumber = generateUniqueBibNumber(takenBibNumbers);

    // save the participant to the database
    const participant = await this.participantRepository.save({
      ...participantData,
      bibNumber,
    });

    // create a registration for the race for event categories specified in the dto
    const eventRaceRegistrations = await this.createRegistrationsForRaces(
      participant,
      eventCategoryIds,
    );

    // update the participant's registration with the event categories

    participant.registrations = eventRaceRegistrations;

    // build a qr code for the participant based on the participant's id, eventId and bib number.

    const { qrCodeBuffer, qrCodeFileName } =
      await this.generateQrCodeForParticipant(participant);

    // upload the qr code to the cloud storage

    // const qrCodeUrl = await this.fileService.uploadFileToStorage(
    //   qrCodeFileName,
    //   '/pdfs/qrcodes',
    //   'image/png',
    //   qrCodeBuffer,
    //   { mediaName: qrCodeFileName, contentType: 'image/png' },
    // );

    // create a ticket with qr code and other details for the participant

    // send the ticket to the participant's email with registration and event details

    // return the participant with status

    return this.participantRepository.save(participant);
  }

  async isUnique(query: {
    email: string;
    eventRaceTypeIds: number[];
  }): Promise<boolean> {
    const { email, eventRaceTypeIds } = query;

    const participant = await this.getParticipantByCond({ email });

    if (!participant) {
      return true;
    }

    const participantRegistrations =
      await this.eventRaceRegistrationRepository.find({
        where: { participantId: participant.id },
      });

    const participantEventCategoryIds = participantRegistrations.map(
      (registration) => registration.eventRaceTypeId,
    );
    const isTaken = eventRaceTypeIds.some((eventCategoryId) =>
      participantEventCategoryIds.includes(eventCategoryId),
    );

    return !isTaken;
  }

  async getParticipantByCond(cond: {
    [key: string]: any;
  }): Promise<Participant> {
    return this.participantRepository.findOne({ where: cond });
  }

  async generateQrCodeForParticipant(participant: Participant): Promise<{
    qrCodeBuffer: Buffer;
    qrCodeFileName: string;
  }> {
    const qrCodeData = `id:${participant};eventId:${participant.eventId};email:${participant.email};bibNumber:${participant.bibNumber}`;

    const qrCodeBuffer = await qrcode.toBuffer(qrCodeData);

    const qrCodeFileName = `participant-${participant.email}-${participant.id}.png`;

    return {
      qrCodeBuffer,
      qrCodeFileName,
    };
  }

  async createRegistrationsForRaces(
    participant: Participant,
    eventCategoryIds: number[],
  ): Promise<EventRaceRegistration[]> {
    // create a registration
    const eventCategories = await this.eventRaceTypeRepository.find({
      where: { id: In(eventCategoryIds) },
    });

    if (
      !eventCategories.length ||
      eventCategories.length !== eventCategoryIds.length
    ) {
      throw new Error("Soem event categories doen not exists");
    }

    const type = await this.registrationTypeRepository.findOne({
      where: { name: "participant" },
    });

    const registrations = eventCategories.map((eventCategory) => {
      return this.eventRaceRegistrationRepository.create({
        participantId: participant.id,
        eventRaceTypeId: eventCategory.id,
        type,
      });
    });

    return await this.eventRaceRegistrationRepository.save(registrations);
  }
}

