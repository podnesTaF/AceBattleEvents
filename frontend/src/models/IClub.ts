import { IMedia } from "./IMedia";
import { ITeam } from "./ITeam";
import { IUser } from "./IUser";

export type IClub = {
  id: number;
  name: string;
  country: string;
  members: IUser[];
  created_at: string;
  city: string;
  teams: ITeam[];
  logo?: IMedia;
  photo?: IMedia;
};

export type JoinRequest = {
  id: number;
  club: IClub;
  user: IUser;
  status: string;
  created_at: string;
};
