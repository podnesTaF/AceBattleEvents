import { IMedia } from "~/lib/media/types/IMedia";

export interface IUser {
  id: number;
  name: string;
  email: string;
  surname: string;
  club?: string;
  city: string;
  country: string;
  balance: number;
  token: string;
  clubId?: number;
  image?: IMedia;
  role?: string;
  gender?: string;
  dateOfBirth?: string;
  worldAthleticsUrl?: string;
}
