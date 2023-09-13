import { IClub } from "~/lib/clubs/types";
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
  club: IClub;
  coach: ICoach;
  logo: IMedia;
  teamImage: IMedia;
  players: IUser[];
  events: IEvent[];
  rank: number | null;
  totalPoints: number | null;
  personalBest: {
    id: number;
    resultInMs: number;
  } | null;
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

export type TeamResult = {
  teamResult_id: number;
  teamResult_resultInMs: number;
  team_id: number;
  team_name: string;
  team_gender: string;
  winner_id: number;
  raceId: number;
  teamId: number;
  clubId: number;
  race_startTime: string;
  event_title: string;
};
