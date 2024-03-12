import { ICountry } from "@/src/entities/Country/model";
import { IGender } from "@/src/entities/Gender/model";

export enum MemberRole {
  RUNNER = "runner",
  SPECTATOR = "spectator",
}

export type IUser = {
  id: number;

  firstName: string;

  lastName: string;

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

  notificationsEnabled?: boolean;

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
