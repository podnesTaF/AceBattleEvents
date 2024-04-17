import { IRunnerResult } from "@lib/models";

export type ISplit = {
    id: number;
    distance: number;
    resultInMs: number;
    runnerResult: IRunnerResult;
  };