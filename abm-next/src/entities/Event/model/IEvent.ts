import { IContent } from "../../Content/model/IContent";
import { IEventRaceType } from "../../Race";
import { IPrizeCategory } from "./EventBound";
import { ITimeTable } from "./ITimeTable";
import { ILocation } from "./Location";

export type IEvent = {
  id: number;
  title: string;
  eventCode: string;
  subtitle: string;

  startDateTime: string;
  endDate: string;

  introImageUrl?: string;
  mainImageUrl?: string;

  typeId: number;
  type: EventType;

  locationId: number;
  location: ILocation;

  timetables: ITimeTable[];

  prizeCategories: IPrizeCategory[];

  contents: IContent[];

  eventRaceTypes: IEventRaceType[];

  active: boolean;
};

export type IFutureEvent = {
  id: number;
  title: string;
  season: string;
  description?: string;
  introImageUrl?: string;
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
  mainImageUrl?: string;
};

export type EventType = {
  id: number;
  name: string;
  description: string;
};
