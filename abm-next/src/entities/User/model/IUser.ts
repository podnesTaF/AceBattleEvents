import { ICountry } from "../../Country";
import { IUserRole } from "./IUserRole";

export enum MemberRole {
  RUNNER = "runner",
  SPECTATOR = "spectator",
}

export interface IUser {
  id: number;
  firstName: string;
  email: string;
  lastName: string;
  city: string;
  country: ICountry;
  imageUrl?: string;
  avatarUrl?: string;

  roles?: IUserRole[];

  emailConfirmed: boolean;

  createdAt: string;

  token: string;
}
