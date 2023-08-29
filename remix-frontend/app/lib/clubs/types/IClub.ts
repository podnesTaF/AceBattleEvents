import { IMedia } from "~/lib/media/types/IMedia";
import { ITeam } from "~/lib/teams/types/ITeam";
import { IUser } from "~/lib/user/types/IUser";

export type IClub = {
  id: number;
  name: string;
  country: string;
  members: IUser[];
  createdAt: string;
  city: string;
  teams: ITeam[];
  logo?: IMedia;
  photo?: IMedia;
};
