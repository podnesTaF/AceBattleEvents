import { IClub } from "~/lib/clubs/types";
import { ICountry } from "~/lib/countries/types";
import { IMedia } from "~/lib/media/types/IMedia";
import {
  CreateRunnerDto,
  CreateSpectatorDto,
  IRunner,
  ISpectator,
  ITeam,
} from "~/lib/types";

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

export type CreateUserDto = {
  name: string;
  surname: string;
  email: string;
  city: string;
  country: string;
  role: string;
  interest: string;
  runner?: CreateRunnerDto;
  spectator?: CreateSpectatorDto;
  image: IMedia | null;
};
