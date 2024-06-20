import { ISplit } from "../../Results";
import { IRunner } from "../../Runner";
import { IRace } from "./IRace";
import { IRaceTeam } from "./IRaceTeam";

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
