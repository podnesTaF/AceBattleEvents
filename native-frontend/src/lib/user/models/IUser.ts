import { IClub } from "@lib/types";
import { IManager } from "./IManager";
import { ICountry, IMedia, IRunner, ISpectator } from "@lib/models";

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