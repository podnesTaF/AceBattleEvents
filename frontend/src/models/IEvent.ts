import { ITeam } from "./ITeam";

export type IEvent = {
  id: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  introImage?: string;
  minorImage?: string;
  price: number;
  teamsCount?: number;
  location: ILocation;
  totalPrize: number;
  prizes: IPrize[];
  teams: ITeam[];
};

export type IPrize = {
  id: number;
  place: number;
  amount: number;
};

export type ILocation = {
  zipCode: string;
  address: string;
  country: ICountry;
  city: string;
};

export type ICountry = {
  id: number;
  name: string;
  code: string;
};
