import { IClub } from "~/lib/clubs/types";
import { ICountry } from "~/lib/countries/types";
import { IMedia } from "~/lib/media/types/IMedia";
import { IRunnerResult, ITeam } from "~/lib/types";

export interface IUser {
  id: number;
  name: string;
  email: string;
  surname: string;
  club?: IClub;
  city: string;
  country: ICountry;
  balance: number;
  token: string;
  clubId?: number;
  image?: IMedia;
  role?: string;

  manager?: IManager;
  runner?: IRunner;
  spectator?: ISpectator;

  createdAt: string;
}

export interface IAdmin {
  id: number;
  name: string;
  email: string;
  surname: string;
  token?: string;
}

export interface IManager {
  id: number;
  teams?: ITeam[];
  club?: IClub;
}

export interface IRunner {
  id: number;
  gender?: string;
  dateOfBirth?: string;
  totalPoints?: number;
  rank?: number;
  personalBests?: IRunnerResult[];
  results?: IRunnerResult[];
  user: IUser;
  teams?: ITeam[];
  club?: IClub;
}

export interface ISpectator {
  id: number;
  favoriteClubs?: IClub;
  user: IUser;
}
