import { IClub } from "~/lib/clubs/types";
import { ICountry } from "~/lib/countries/types";
import { IMedia } from "~/lib/media/types/IMedia";

export interface IUser {
  id: number;
  name: string;
  email: string;
  surname: string;
  club?: IClub;
  city: string;
  country: ICountry;
  balance: number;
  token: string;
  clubId?: number;
  image?: IMedia;
  role?: string;
  gender?: string;
  dateOfBirth?: string;
  worldAthleticsUrl?: string;
  favoriteClubs?: IClub;
  createdAt: string;
}
