import { ILocation } from "./ILocation";

export type IEvent = {
  id?: number;
  title: string;
  description: string;
  startDateTime: string;
  endDate: string;
  introImageUrl?: string;
  minorImageUrl?: string;
  teamsCount?: number;
  location: ILocation;
  totalPrize?: number;
};
