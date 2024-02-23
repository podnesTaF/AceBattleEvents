import { ICountry } from "@/common/lib/types";
import { IGender } from "./IGender";

export enum MemberRole {
  RUNNER = "runner",
  SPECTATOR = "spectator",
}

export type IUser = {
  id: number;

  firstName: string;

  secondName: string;

  email: string;

  password?: string;

  oauthProvider?: string;

  oauthId?: string;

  genderId: number;

  gender?: IGender;

  dateOfBirth?: string;

  phoneNumber?: string;

  emailVerified: boolean;

  roles: any[];

  countryId?: number | null;

  country?: ICountry;

  city?: string;

  imageName?: string;

  avatarName?: string;

  newsSubscription?: boolean;

  bestResults?: any[];

  category?: any;

  pushTokens?: any[];

  runnerCoaches?: any[];

  coachRunners?: any[];

  requestsInitiated?: any[];

  coachTeams?: any[];

  runnerTeams?: any[];

  createdAt: Date;

  updatedAt: Date;

  token?: string;
};
