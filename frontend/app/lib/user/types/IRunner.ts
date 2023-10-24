import { IClub, IRunnerResult, ITeam, IUser } from "~/lib/types";

export interface IRunner {
  id: number;
  gender?: string;
  dateOfBirth?: string;
  totalPoints?: number;
  rank?: number;
  personalBests?: IRunnerResult[];
  results?: IRunnerResult[];
  user: IUser;
  teams?: ITeam[];
  club?: IClub;
}

export type CreateRunnerDto = {
  dateOfBirth: string;
  gender: string;
  category: "professional" | "amateur";
  worldAthleticsUrl?: string;
  personalBests: {
    distanceInCm: number;
    timeInMs: number;
  }[];
  seasonBests: {
    distanceInCm: number;
    timeInMs: number;
  }[];
};
