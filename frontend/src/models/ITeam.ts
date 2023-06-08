import { IUser } from "./IUser";

export type ITeam = {
  id: number;
  name: string;
  country: string;
  city: string;
  membersCount: number;
  manager: IUser;
  club: string;
  coach: ICoach;
  players: IPlayer[];
};

export type CreateTeam = {
  name: string;
  country: string;
  city: string;
  club: string;
  coachName: string;
  coachSurname: string;
  coachGender: string;
  players: IPlayer[];
};

export type ReqTeam = {
  name: string;
  country: string;
  city: string;
  club: string;
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
  personalBests: IPersonalBest[];
};

export type IPersonalBest = {
  id: number;
  distance: number;
  timeInSeconds: number;
};
