import { ITeam } from "./ITeam";

export type IEvent = {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
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
  sum: number;
};

export type ILocation = {
  zipCode: string;
  address: string;
  country: string;
  city: string;
};
