import { IUser, IClub } from "@lib/models";

export interface ISpectator {
  id: number;
  favoriteClubs?: IClub;
  ageRange?: string;
  user: IUser;
}
