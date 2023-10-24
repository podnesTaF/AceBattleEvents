import { IEvent } from "~/lib/events/types";
import { ITeam } from "~/lib/teams/types";
import { ITeamResult } from "./teamResults";

export type IRace = {
  id: number;
  startTime: string;
  teams: ITeam[];
  name: string;
  winner: ITeam | null;
  event: IEvent;
  teamResults?: ITeamResult[];
};
