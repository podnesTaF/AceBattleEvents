import { IEvent, ITeam, ITeamResult } from "@lib/models";

export type IRace = {
  id: number;
  startTime: string;
  teams: ITeam[];
  name: string;
  winner: ITeam | null;
  event: IEvent;
  teamResults?: ITeamResult[];
};

export type RaceShortForm = {
  id: number;
  name: string;
  startTime: string;
};
