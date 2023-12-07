import { IClub, ITeam, IUser } from "@lib/models";

export interface IManager {
  id: number;
  teams?: ITeam[];
  club?: IClub;
  user: IUser;
}
