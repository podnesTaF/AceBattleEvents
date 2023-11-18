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

export type UserResult = {
  runnerResult_id: number;
  runnerResult_distance: number;
  runnerResult_finalResultInMs: number;
  teamResult_id: number;
  teamResult_resultInMs: number;
  team_id: number;
  race_id: number;
  race_startTime: string;
  event_id: number;
  event_title: string;
  winner_id: number;
  pbForRunner_id: boolean;
};
