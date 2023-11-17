import { IClub, IRunnerResult, ITeam, IUser } from "@lib/models";

export interface IRunner {
  id: number;
  gender: string;
  dateOfBirth?: string;
  category: "professional" | "amateur";
  totalPoints?: number;
  rank: number;
  personalBests?: IRunnerResult[];
  results?: IRunnerResult[];
  user: IUser;
  teamsAsRunner?: ITeam[];
  club?: IClub;
}

export interface RunnerPreview {
  id: number;
  gender: string;
  dateOfBirth: string;
  user: IUser;
  teamsAsRunner: ITeam[];
}
