import { IEventRaceType } from "./IEventRaceType";
import { IRaceRunner } from "./IRaceRunner";
import { IRaceTeam } from "./IRaceTeam";

export type IRace = {
  id: number;
  name: string;
  description?: string;

  startTime: string;
  endTime: string;

  published: boolean;
  finished: boolean;

  eventRaceTypeId: number;
  eventRaceType: IEventRaceType;

  raceTeams?: IRaceTeam[];
  raceRunners?: IRaceRunner[];

  winnerId?: number;

  winner?: IRaceTeam;
};

export type IRaceType = {
  id: number;
  name: string;

  description?: string;
};
