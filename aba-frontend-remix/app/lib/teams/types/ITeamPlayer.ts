import { IRunner, ITeam } from "~/lib/types";

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
