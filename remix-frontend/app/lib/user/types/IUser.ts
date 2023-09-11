import { IClub } from "~/lib/clubs/types";
import { ICountry } from "~/lib/countries/types";
import { IMedia } from "~/lib/media/types/IMedia";
import { IRunnerResult } from "~/lib/types";

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
  gender?: string;
  dateOfBirth?: string;
  worldAthleticsUrl?: string;
  favoriteClubs?: IClub;
  createdAt: string;
  totalPoints?: number;
  rank?: number;
  personalBests?: IRunnerResult[];
  results?: IRunnerResult[];
}

export interface IAdmin {
  id: number;
  name: string;
  email: string;
  surname: string;
  token?: string;
}
