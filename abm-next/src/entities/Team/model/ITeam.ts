import { ICountry } from "../../Country";
import { IRaceTeam } from "../../Race";
import { IRegistration } from "../../Registration";
import { IGender, IUser } from "../../User";
import { ITeamPlayer } from "./ITeamPlayer";

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
