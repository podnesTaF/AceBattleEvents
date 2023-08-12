import { ICountry } from "~/lib/countries/types";
import { IEvent } from "~/lib/events/types";
import { IMedia } from "~/lib/media/types/IMedia";
import { IUser } from "~/lib/user/types/IUser";
import { ICoach } from "./ICoach";

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
  players: IUser[];
  events: IEvent[];
};

export type ReqTeam = {
  name: string;
  country: string;
  city: string;
  clubId: number;
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
