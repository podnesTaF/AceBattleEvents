import { IRace, IRunner } from "~/lib/types";
import { IRaceTeam, ITeamResult } from "./teamResults";

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

export type IRaceRunner = {
  id: number;

  runnerId: number;
  runner: IRunner;

  raceId?: number;
  race?: IRace;

  raceTeamId?: number;
  raceTeam?: IRaceTeam;

  confirmed: boolean;

  startNumber?: number;

  runnerRoleId: number;
  runnerRole: IRunnerRole;

  splits: ISplit[];
};

export type IRunnerRole = {
  id: number;
  name: string;
  description: string;
};
