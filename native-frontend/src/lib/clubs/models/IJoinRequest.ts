import { IUser, IClub } from "@lib/models";

export type JoinRequest = {
    id: number;
    club: IClub;
    user: IUser;
    motivation: string;
    status: string;
    created_at: string;
  };
  