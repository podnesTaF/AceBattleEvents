import { IRunner, ISplit, ITeamResult } from "@lib/models";

export type IRunnerResult = {
    id: number;
    distance: number;
    finalResultInMs: number;
    runner: IRunner;
    teamResult: ITeamResult;
    splits: ISplit[];
    runnerType: "joker-1" | "pacer-1" | "joker-2" | "pacer-2";
  };