import { IEvent } from "~/lib/events/types";
import { ITeam } from "~/lib/teams/types";
import { ITeamResult } from "./teamResults";

export type IRace = {
  id: number;
  startTime: string;
  teams: ITeam[];
  winner: ITeam[];
  event: IEvent;
  teamResults: ITeamResult[];
};