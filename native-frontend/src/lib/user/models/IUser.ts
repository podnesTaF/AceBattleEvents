import {
  IClub,
  ICoach,
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
  expoPushToken?: string;
  clubId?: number;
  avatar?: IMedia;
  image?: IMedia;
  phone?: string;
  role?: string;

  manager?: IManager;
  runner?: IRunner;
  coach?: ICoach;
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
  loading: boolean | null;
  error: string | null;
}
