import { IRaceRunner } from "~/lib/races/types/runnerResults";
import { IRegistration } from "~/lib/teams/types/Registrations";
import { IClub, IRace, ITeamEvent, ITeamPlayer, IViewer } from "~/lib/types";
import { AuthenticatedUser, IUser } from "./IUser";

export type TabReturnData = {
  tab?: string | null;
  scrollY?: string | null;
  user: IUser;
  authedUser?: AuthenticatedUser | null;
  runnerTeams?: ITeamPlayer[];
  calendar?: IRegistration[];

  viewerRegistrations?: IViewer[];
  teamRegistrations?: ITeamEvent[];
  favoriteClubs?: IClub[];
  club?: IClub | null;

  races?: IRace[];
  tableRaces?: any[];
  resultsData?: {
    items: IRaceRunner[];
    meta: {
      totalPages: number;
      currentPage: number;
    };
  };
  resultsTableData?: any[];
  token?: string;
  resultYear?: string;
  resultCategory?: string;
};
