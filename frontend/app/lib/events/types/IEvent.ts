import { ILocation } from "~/lib/countries/types";
import { IMedia } from "~/lib/media/types/IMedia";
import { IContent } from "~/lib/news/types/INews";
import { ITeam } from "~/lib/teams/types/ITeam";
import { IPrizeCategory } from "./EventBound";

export type IEvent = {
  id?: number;
  title: string;
  eventCode: string;
  description: string;
  startDateTime: string;
  endDate: string;
  introImage?: IMedia;
  minorImage?: IMedia;
  teamsCount?: number;
  location: ILocation;
  totalPrize?: number;
  prizeCategories: IPrizeCategory[];
  teams?: ITeam[];
  contents: IContent[];
};

export type IFutureEvent = {
  id: number;
  title: string;
  season: string;
  description?: string;
  introImage?: IMedia;
  locationInfo?: string;
  contents?: IContent[];
  date?: string;
  announced: boolean;
  event?: IEvent;
};

export type EventShortform = {
  id: number;
  title: string;
  startDateTime: string;
  eventCode: string;
  introImage?: IMedia;
};
