import { IUser } from "@/app/(user)/_lib/types";
import { ITeam } from "./ITeam";

export type ITeamPlayer = {
  id: number;
  teamId: number;
  runnerId: number;
  team: ITeam;
  runner: IUser;
  memberSince: string;
  memberUntil?: string;
  active: boolean;
};
