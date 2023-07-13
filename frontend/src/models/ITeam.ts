import { ICountry, IEvent } from "./IEvent";
import { IMedia } from "./IMedia";
import { IUser } from "./IUser";

export type ITeam = {
  id: number;
  name: string;
  gender: string;
  country: ICountry;
  city: string;
  membersCount: number;
  manager: IUser;
  club: string;
  coach: ICoach;
  logo: IMedia;
  teamImage: IMedia;
  players: IPlayer[];
  events: IEvent[];
};

export type CreateTeam = {
  name: string;
  country: string;
  city: string;
  club: string;
  coachName: string;
  gender: string;
  coachSurname: string;
  coachGender: string;
  players: IPlayer[];
};

export type ReqTeam = {
  name: string;
  country: string;
  city: string;
  club: string;
  gender: string;
  logo: IMedia;
  teamImage: IMedia;
  coach: {
    surname: string;
    name: string;
  };
  players: {
    surname: string;
    name: string;
    dateOfBirth: string;
    gender: string;
  }[];
};

export type ICoach = {
  id: number;
  surname: string;
  name: string;
};

export type IPlayer = {
  id: number;
  surname: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  image?: IMedia;
  worldAthleticsUrl?: string;
  personalBests: IPersonalBest[];
};

export type IPersonalBest = {
  id: number;
  distance: number;
  timeInSeconds: number;
};

export type ITeamEvent = {
  event: IEvent;
  team: ITeam;
};
