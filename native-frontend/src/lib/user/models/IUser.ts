import { IClub, ICountry, IMedia, IRunner, ISpectator } from "@lib/models";
import { IManager } from "./IManager";

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

export interface UserState {
  data?: IUser | null;
  isAuth: boolean | null;
}
