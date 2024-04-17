import { ITeam } from "~/lib/teams/types";
import { IRace } from "./races";
import { IRaceRunner, IRunnerResult } from "./runnerResults";

export type ITeamResult = {
  id: number;
  resultInMs: number;
  race: IRace;
  team: ITeam;
  runnerResults: IRunnerResult[];
};

export type IRaceTeam = {
  id: number;
  teamId: number;
  team: ITeam;
  raceId: number;
  race: IRace;
  raceRunners: IRaceRunner[];
  confirmed: boolean;
  finished: boolean;
  won: boolean;
  totalTimeInMs?: number;
};
