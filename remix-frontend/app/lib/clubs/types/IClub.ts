import { IMedia } from "~/lib/media/types/IMedia";
import { ITeam } from "~/lib/teams/types/ITeam";
import { ICountry } from "~/lib/types";
import { IManager, IRunner } from "~/lib/user/types/IUser";

export type IClub = {
  id: number;
  name: string;
  country: ICountry;
  runners: IRunner[];
  manager: IManager;
  createdAt: string;
  city: string;
  teams: ITeam[];
  logo?: IMedia;
  photo?: IMedia;
};
