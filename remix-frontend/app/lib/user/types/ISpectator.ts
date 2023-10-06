import { IClub, IUser } from "~/lib/types";

export interface ISpectator {
  id: number;
  favoriteClubs?: IClub;
  ageRange?: string;
  user: IUser;
}

export type CreateSpectatorDto = {
  ageRange: string;
};
