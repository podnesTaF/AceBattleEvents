import { IRunnerResult } from "../../Results";
import { ITeamPlayer } from "../../Team";
import { IGender, IUser } from "../../User";

export interface IRunner extends IUser {
  genderId: number;
  gender: IGender;
  dateOfBirth: string;
  totalPoints: number;
  category?: string;
  rank?: number;
  runnerTeams?: ITeamPlayer[];

  personalBests?: IRunnerResult[];
  results?: IRunnerResult[];
}
