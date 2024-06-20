import { ICountry } from "../../Country";
import { IEvent } from "../../Event";
import { IGender } from "../../User";
import { IRegistration } from "./IRegistration";

export type IParticipant = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  eventId: number;
  event: IEvent;
  dateOfBirth: string;
  genderId: number;
  gender: IGender;
  countryId: number;
  country: ICountry;
  city: string;
  phoneCode: string;
  phoneNumber: string;
  bibNumber: number;
  qrCodeUrl?: string;
  ticketUrl?: string;
  registrations: IRegistration[];
};

export type CreateParticipant = {
  firstName: string;
  lastName: string;
  email: string;
  eventId: number;
  phoneNumber: string;
  phoneCode: string;
  dateOfBirth: string;
  genderId: number;
  countryId: number;
  city: string;
  eventCategoryIds: number[];
};
