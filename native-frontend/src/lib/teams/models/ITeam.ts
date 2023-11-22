import { ICountry } from "@lib/countries/models/ICountry";
import {
  IClub,
  ICoach,
  IEvent,
  IMedia,
  IRace,
  IRunner,
  ITeamResult,
  IUser,
} from "@lib/models";

export type ITeam = {
  id: number;
  name: string;
  gender: string;
  country: ICountry;
  city: string;
  membersCount: number;
  manager: IUser;
  club: IClub;
  coach: ICoach;
  logo: IMedia;
  teamImage: IMedia;
  players: IRunner[];
  events: IEvent[];
  rank: number | null;
  totalPoints: number | null;
  personalBest: ITeamResult | null;
  races: IRace[];

  followers: IUser[];
};
