import { IEvent, IRaceRegistration, ITeam, ITeamResult } from "@lib/models";

export type IRace = {
  id: number;
  startTime: string;
  teams: ITeam[];
  name: string;
  winner: ITeam | null;
  event: IEvent;
  teamResults?: ITeamResult[];
};

export type RaceWithCheckIn = IRace & {
  availableForCheckIn?: boolean;
  raceRegistrationsToCheckIn?: IRaceRegistration[];
};

export type RaceShortForm = {
  id: number;
  name: string;
  startTime: string;
};
