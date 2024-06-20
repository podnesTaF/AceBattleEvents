import { ITeam } from "../../Team";
import { IRace } from "./IRace";
import { IRaceRunner } from "./IRaceRunner";

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
