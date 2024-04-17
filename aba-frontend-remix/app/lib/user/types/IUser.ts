import { ICountry } from "~/lib/countries/types";
import {
  ICategory,
  IGender,
  IRole,
  IRunnerResult,
  ITeamPlayer,
} from "~/lib/types";

export enum RunnerCategory {
  PROFESSIONAL = "professional",
  AMATEUR = "amateur",
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

export interface IRunner extends IUser {
  genderId: number;
  gender: IGender;
  dateOfBirth: string;
  totalPoints: number;
  category?: ICategory;
  rank?: number;
  runnerTeams?: ITeamPlayer[];

  personalBests?: IRunnerResult[];
  results?: IRunnerResult[];
}

export interface IUserRole {
  id: number;
  userId: number;
  roleId: number;
  user: IUser;
  role: IRole;
  subscriptionStatus?: string;
  stripeSubscriptionId?: string;
  startDate?: string;
  endDate?: string;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  roles: RequestRole[];
}

export interface RequestRole {
  id: number;
  name: string;
  active: boolean;
}

export interface IAdmin {
  id: number;
  name: string;
  email: string;
  surname: string;
  token?: string;
}

export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailConfirmed: boolean;
  city: string;
  countryId: number;
  roleIds: number[];

  runner?: CreateRunnerDto;
};

export type CreateRunnerDto = {
  dateOfBirth?: string;
  genderId?: number;
  category: RunnerCategory;
  bestResults: CreatePersonalBestDto[];
};

export type CreatePersonalBestDto = {
  timeInMs: number;

  distanceId: number;

  type: string;
};
