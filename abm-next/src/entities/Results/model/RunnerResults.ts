import { IRaceRunner } from "../../Race";
import { IRunner } from "../../Runner";
import { ITeamResult } from "./TeamResults";

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
  distanceInCm: number;
  resultInMs: number;
  raceRunner: IRaceRunner;
  finalSplit: boolean;
  firstSplit: boolean;
};
