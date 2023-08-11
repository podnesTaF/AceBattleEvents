import { IUser } from "~/lib/user/types/IUser";
import { IClub } from "./IClub";

export type JoinRequest = {
  id: number;
  club: IClub;
  user: IUser;
  motivation: string;
  status: string;
  created_at: string;
};
