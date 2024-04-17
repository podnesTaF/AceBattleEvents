import { IGender, IRunner, IRunnerResult, ITeam } from "~/lib/types";
import { IRaceType } from "./races";

export type EventRaceTypeResults = {
  id: number;
  raceType: IRaceType;
  topForCategories: {
    gender: IGender;
    top: TopPerformer[];
  }[];
  racesByType: {
    [type: string]: {
      id: number;
      name: string;
      startTime: string;
    }[];
  };
};

export type TopPerformer = {
  place: number;
  team: ITeam;
  wins: number;
  bestTimeInMs: number;
};

export type BestSportsmen = {
  [gender: string]: {
    runner: IRunner;
    finalResultInMs: number;
  };
};

export type BestJokerPair = {
  [gender: string]: {
    runners: IRunnerResult[];
    finalResultInMs: number;
  };
};
