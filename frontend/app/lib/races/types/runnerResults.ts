import { IRunner } from "~/lib/types";
import { ITeamResult } from "./teamResults";

export type IRunnerResult = {
  id: number;
  distance: number;
  finalResultInMs: number;
  runner: IRunner;
  teamResult: ITeamResult;
  splits: ISplit[];
  runnerType: "joker-1" | "pacer-1" | "joker-2" | "pacer-2";
};

export type ISplit = {
  id: number;
  distance: number;
  resultInMs: number;
  runnerResult: IRunnerResult;
};
