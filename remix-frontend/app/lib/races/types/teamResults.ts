import { ITeam } from "~/lib/teams/types";
import { IRace } from "./races";
import { IRunnerResult } from "./runnerResults";

export type ITeamResult = {
  id: number;
  resultInMs: number;
  race: IRace[];
  team: ITeam;
  runnerResults: IRunnerResult;
};
