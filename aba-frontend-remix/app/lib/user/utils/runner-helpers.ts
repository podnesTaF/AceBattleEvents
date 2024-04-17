import { IRunner } from "../types";

export const getRunnerActiveTeam = (runner: IRunner) => {
  return runner.runnerTeams?.find((teamPlayer) => teamPlayer?.active);
};
