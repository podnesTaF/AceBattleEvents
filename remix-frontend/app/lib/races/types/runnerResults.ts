import { IUser } from "~/lib/user/types/IUser";
import { ITeamResult } from "./teamResults";

export type IRunnerResult = {
  id: number;
  distance: number;
  finalResultInMs: number;
  runner: IUser;
  teamResult: ITeamResult;
  splits: ISplit[];
  runnerType: "joker1" | "pacer1" | "joker2" | "pacer2";
};

export type ISplit = {
  id: number;
  distance: number;
  resultInMs: number;
  runnerResult: IRunnerResult;
};
