import { IRunner } from "../model";

export const getRunnerActiveTeam = (runner: IRunner) => {
  return runner.runnerTeams?.find((teamPlayer) => teamPlayer?.active);
};
