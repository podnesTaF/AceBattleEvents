import { IUser } from "@/app/(user)/_lib/types";
import { ICountry } from "@/common/lib/types";
import { IGender } from "../../genders/types";
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
