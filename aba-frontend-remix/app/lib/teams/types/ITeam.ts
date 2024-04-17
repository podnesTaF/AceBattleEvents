import { ICountry } from "~/lib/countries/types";
import { IMedia } from "~/lib/media/types/IMedia";
import { IRaceTeam } from "~/lib/races/types/teamResults";
import { IGender, ITeamPlayer, IUser } from "~/lib/types";
import { IRegistration } from "./Registrations";

export type ITeam = {
  id: number;
  name: string;

  genderId: number;
  gender: IGender;

  countryId: number;
  country: ICountry;

  city: string;

  membersCount?: number;

  coachId: number;
  coach: IUser;

  logoUrl?: string;
  imageUrl?: string;

  teamRunners: ITeamPlayer[];

  registrations: IRegistration[];

  teamRaces: IRaceTeam[];

  joinRequestOpen: boolean;

  rank: number | null;
  prevRank: number | null;

  totalPoints: number | null;
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
