import { ILocation } from "~/lib/countries/types";
import { IMedia } from "~/lib/media/types/IMedia";
import { ITeam } from "~/lib/teams/types/ITeam";
import { IPrize } from "./EventBound";

export type IEvent = {
  id: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  introImage?: IMedia;
  minorImage?: IMedia;
  price: number;
  teamsCount?: number;
  location: ILocation;
  totalPrize: number;
  prizes: IPrize[];
  teams: ITeam[];
};
