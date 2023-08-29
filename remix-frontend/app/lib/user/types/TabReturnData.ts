import {
  IClub,
  IRace,
  ITeam,
  ITeamEvent,
  IViewer,
  UserResult,
} from "~/lib/types";
import { IUser } from "./IUser";
import { PersonalEvents } from "./PersonalCalendar";

export type TabReturnData = {
  tab?: string;
  scrollY: string | null;
  user: IUser;
  teams?: ITeam[];
  viewerRegistrations?: IViewer[];
  teamRegistrations?: ITeamEvent[];
  favoriteClubs?: IClub[];
  club?: IClub | null;
  calendar?: PersonalEvents[];
  races?: IRace[];
  resultsData?: {
    results: UserResult[];
    totalPages: number;
    currentPage: number;
  };
  token?: string;
};
