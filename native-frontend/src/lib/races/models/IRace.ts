import { ITeam, ITeamResult, IEvent } from "@lib/models";

export type IRace = {
  id: number;
  startTime: string;
  teams: ITeam[];
  name: string;
  winner: ITeam | null;
  event: IEvent;
  teamResults?: ITeamResult[];
};
