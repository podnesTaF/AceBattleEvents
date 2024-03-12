import { ICountry } from "@/src/entities/Country";
import { IGender } from "@/src/entities/Gender";
import { IUser } from "@/src/entities/User";
import { ITeamPlayer } from "./ITeamPlayer";

export type ITeam = {
  id: number;
  name: string;
  countryId: number;
  country: ICountry;
  city: string;

  coachId: number;
  coach: IUser;

  categoryId: number;
  genderId: number;
  gender: IGender;
  rank?: number;
  prevRank?: number;
  logoName?: string;
  imageName?: string;
  teamBio?: string;
  joinRequestOpen: boolean;

  teamRunners: ITeamPlayer[];
};
