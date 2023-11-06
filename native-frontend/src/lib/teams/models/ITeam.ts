import { IUser, IRunner, ICountry, IMedia, IEvent, ITeamResult, ICoach } from "@lib/models";

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
};
