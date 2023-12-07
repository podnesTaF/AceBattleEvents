import {
  IClub,
  ICountry,
  IMedia,
  INotification,
  IRunner,
  ISpectator,
  ITeam,
} from "@lib/models";
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
  avatar?: IMedia;
  image?: IMedia;
  role?: string;

  manager?: IManager;
  runner?: IRunner;
  spectator?: ISpectator;
  rolePending?: string;

  sentNotifications?: INotification[];
  receivedNotifications?: INotification[];

  followingRunners: IRunner[];

  followingTeams: ITeam[];

  createdAt: string;
}

export interface UserState {
  data?: IUser | null;
  isAuth: boolean | null;
}
