import { ITeam, ITeamRaceRunner } from "@lib/models";
import { IRace } from "./IRace";

export type IRaceRegistration = {
  id: number;
  checkedIn: boolean;
  approved: boolean;

  approvedAt: string | null;

  teamRaceRunners: ITeamRaceRunner[] | null;

  race: IRace;

  team: ITeam;

  createdAt: string;
};
