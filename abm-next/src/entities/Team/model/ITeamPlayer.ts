import { IRunner } from "../../Runner";
import { ITeam } from "./ITeam";

export type ITeamPlayer = {
  id: number;
  runnerId: number;
  teamId: number;
  memberSince: string;
  memberUntil?: string;
  active: boolean;
  runner: IRunner;
  team: ITeam;
};
