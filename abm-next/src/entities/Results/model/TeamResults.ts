import { IRace } from "../../Race";
import { ITeam } from "../../Team";
import { IRunnerResult } from "./RunnerResults";

export type ITeamResult = {
  id: number;
  resultInMs: number;
  race: IRace;
  team: ITeam;
  runnerResults: IRunnerResult[];
};
