import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import sgMail from "@sendgrid/mail";
import { In, Repository } from "typeorm";
import { EventRaceRegistration } from "../event-race-registration/entities/event-race-registration.entity";
import { RegistrationType } from "../event-race-registration/entities/registration-type.entity";
import { EventRaceType } from "../event-race-type/entities/event-race-type.entity";
import { FileService } from "../file/file.service";
import { generatePDFFromHTML } from "../file/utils/getPdfFromHTML";
import { OneTimeTokenService } from "../ott/ott.service";
import { getVerificationLetterTemplate } from "../users/utils/getVerificationTemplate";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { Participant } from "./entities/participant.entity";
import { getConfirmedParticipantEmail } from "./utils/getConfirmedParticipantEmail";
import { getParticipantIndividualRaceTicket } from "./utils/getParticipantIndividualRaceTicket";
import { getParticipantTicketAllRaces } from "./utils/getParticipantTicketAllRaces";

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
    private readonly ottService: OneTimeTokenService,
    private readonly jwtService: JwtService,
  ) {
    sgMail.setApiKey(process.env.SEND_GRID_API_K);
  }

  async createParticipant(
    dto: CreateParticipantDto,
  ): Promise<Participant & { ott: string }> {
    const { eventCategoryIds, ...participantData } = dto;

    // check if the participant is unique by email and event categories

    const isUnique = await this.isUnique({
      email: participantData.email,
      eventRaceTypeIds: eventCategoryIds,
    });

    if (!isUnique) {
      throw new Error("Participant already exists");
    }

    // save the participant to the database
    const participant = await this.participantRepository.save({
      ...participantData,
    });

    let participantWithRegistrations: Participant;
    let ott: string;
    try {
      // create a registration for the race for event categories specified in the dto
      const eventRaceRegistrations = await this.createRegistrationsForRaces(
        participant,
        eventCategoryIds,
      );

      participant.registrations = eventRaceRegistrations;
      participantWithRegistrations = await this.participantRepository.save(
        participant,
      );

      // generate jwt to contain necessary data
      const jwtToken = this.jwtService.sign(
        { email: participant.email, id: participant.id },
        {
          expiresIn: "1d",
        },
      );
      // create ott token
      const token = await this.ottService.createToken(
        null,
        jwtToken,
        24 * 60,
        "participant",
      );

      ott = token;

      // load some relations for participant

      participantWithRegistrations = await this.participantRepository.findOne({
        where: { id: participant.id },
        relations: ["registrations.eventRaceType.raceType", "event"],
      });

      // send email to the participant
      await this.sendVerificationEmail(participantWithRegistrations, token);
    } catch (error) {
      // delete the participant if an error occurs and if the participant was saved
      if (participant?.id) {
        await this.participantRepository.delete(participant.id);
      }

      const errorToThrow = new Error(
        `Failed to process registration: ${error.message || error.toString()}`,
      );
      errorToThrow.stack = error.stack; // Preserve original stack trace
      throw errorToThrow;
    }

    return { ...participantWithRegistrations, ott };
  }

  async isUnique(query: {
    email: string;
    eventRaceTypeIds: number[];
  }): Promise<boolean> {
    const { email, eventRaceTypeIds } = query;

    const participant = await this.getParticipantByCond(
      {
        email,
      },
      ["registrations"],
    );

    if (!participant || participant.status !== "confirmation") {
      return true;
    }

    const registrationIds = participant.registrations.map(
      (registration) => registration.eventRaceTypeId,
    );

    for (const id of eventRaceTypeIds) {
      if (registrationIds.includes(id)) {
        return false;
      }
    }

    return true;
  }

  async getParticipantByCond(
    cond: {
      [key: string]: any;
    },
    relations?: string[],
  ): Promise<Participant> {
    return this.participantRepository.findOne({ where: cond, relations });
  }

  async resendConfirmationEmail(token: string): Promise<string> {
    const ott = await this.ottService.getOttInfo(token);

    if (!ott) {
      throw new NotFoundException("Token not found");
    }

    const { email, id } = this.jwtService.verify(ott.jwtToken) as {
      email: string;
      id: number;
    };

    const participant = await this.getParticipantByCond({
      id: id,
      email: email,
    });

    await this.sendVerificationEmail(participant, token);

    return "Email sent";
  }

  async sendVerificationEmail(
    participant: Participant,
    token: string,
  ): Promise<void> {
    const msg = {
      to: participant.email,
      from: {
        email: "info@aba.run",
        name: "Ace Battle Mile",
      },
      subject: "Confirm your email address and grab tickets | Ace Battle Mile",
      html: getVerificationLetterTemplate({
        name: participant.firstName + " " + participant.lastName,
        token: token,
        eventCode: participant.event.eventCode,
      }),
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      throw new Error("Error sending email");
    }
  }

  async sendTicketEmail(
    participant: Participant,
    file: Buffer,
    ticketFileName: string,
  ): Promise<void> {
    // file for the attachment
    const filebase64 = file.toString("base64");

    const attachment = [
      {
        content: filebase64,
        filename: ticketFileName,
        type: "application/pdf",
        disposition: "attachment",
      },
    ];

    const msg = {
      to: participant.email,
      from: {
        email: "info@aba.run",
        name: "Ace Battle Mile",
      },
      subject: "Your Ace Battle Mile Ticket & Event Details | Ace Battle Mile",
      html: getConfirmedParticipantEmail({
        participant: participant,
      }),
      attachments: attachment,
    };

    // Send the email
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }

  async confirmEmail(token: string): Promise<Participant> {
    const ott = await this.ottService.getOttInfo(token);

    if (!ott) {
      throw new NotFoundException("Token not found");
    }

    const { email, id } = this.jwtService.verify(ott.jwtToken) as {
      email: string;
      id: number;
    };

    const participant = await this.getParticipantByCond(
      {
        id: id,
        email: email,
      },
      ["registrations.eventRaceType.raceType", "event"],
    );

    if (!participant) {
      throw new NotFoundException("Participant not found");
    }

    if (participant.status === "confirmed") {
      return participant;
    }

    participant.status = "confirmed";

    // generate the bib number

    const generateBibNumber = await this.generateBibNumber(
      participant.eventId,
      50,
      1000,
    );

    participant.bibNumber = generateBibNumber;

    // gererate participat hash (jwt)

    const participantHash = this.jwtService.sign(
      {
        email: participant.email,
        id: participant.id,
        bibNumber: participant.bibNumber,
      },
      {
        expiresIn:
          participant.event.endDate.getTime() -
          Date.now() +
          1000 * 60 * 60 * 240, // end date + 10 days in case of changes
      },
    );

    participant.entranceHash = participantHash;

    return this.participantRepository.save(participant);
  }

  async generateTicketsForParticipant(token: string): Promise<string> {
    const ott = await this.ottService.getOttInfo(token);

    if (!ott) {
      throw new NotFoundException("Token not found");
    }

    const { email, id } = this.jwtService.verify(ott.jwtToken) as {
      email: string;
      id: number;
    };

    const participant = await this.getParticipantByCond(
      {
        id: id,
        email: email,
      },
      ["registrations.eventRaceType.raceType", "event.location.country"],
    );

    if (!participant) {
      throw new NotFoundException("Participant not found");
    }

    if (participant.ticketUrl) {
      return participant.ticketUrl;
    }

    if (participant.status !== "confirmed" || !participant.entranceHash) {
      throw new Error("Participant is not confirmed");
    }

    // generate the ticket

    let htmlContent: string;
    let ticketType: "multiple" | "individual";

    let randomNum = Math.floor(Math.random() * 1000);

    if (participant.registrations.length > 1) {
      htmlContent = getParticipantTicketAllRaces(participant);
      ticketType = "multiple";
    } else {
      htmlContent = getParticipantIndividualRaceTicket(participant);
      ticketType = "individual";
    }

    const ticketBuffer = await generatePDFFromHTML(htmlContent);

    const ticketFileName = `participant-${ticketType}-${participant.lastName}-${randomNum}.pdf`;

    // upload the ticket to the storage
    const ticketUrl = await this.fileService.uploadFileToStorage(
      ticketFileName,
      "tickets",
      "application/pdf",
      ticketBuffer,
      {
        contentType: "application/pdf",
      },
    );

    participant.ticketUrl = ticketUrl;

    await this.participantRepository.save(participant);

    // send ticket duplicate to the participant's email

    await this.sendTicketEmail(participant, ticketBuffer, ticketFileName);

    return ticketUrl;
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

  async getParticipantById(id: number): Promise<Participant> {
    return this.participantRepository.findOne({
      where: { id },
      relations: ["registrations.eventRaceType.raceType", "event"],
    });
  }

  async generateBibNumber(
    eventId: number,
    startRange: number,
    endRange: number,
  ): Promise<number> {
    const participants = await this.participantRepository.find({
      where: { eventId },
      select: ["bibNumber"],
    });

    const bibNumbers = participants.map((participant) => participant.bibNumber);

    for (let i = startRange; i <= endRange; i++) {
      if (!bibNumbers.includes(i)) {
        return i;
      }
    }

    throw new Error("No bib number available");
  }
}

