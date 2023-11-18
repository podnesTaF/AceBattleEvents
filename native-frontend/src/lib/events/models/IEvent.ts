import { ILocation, IMedia, IPrize, ITeam } from "@lib/models";

export type IEvent = {
  id?: number;
  title: string;
  description: string;
  startDateTime: string;
  endDate: string;
  introImage?: IMedia;
  minorImage?: IMedia;
  teamsCount?: number;
  location: ILocation;
  totalPrize?: number;
  prizes: IPrize[];
  teams?: ITeam[];
};

export type EventShortform = {
  id: number;
  title: string;
  startDateTime: string;
  introImage?: IMedia;
};
