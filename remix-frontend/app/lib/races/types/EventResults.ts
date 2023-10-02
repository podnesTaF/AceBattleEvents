import { IRunnerResult, ITeam, IUser } from "~/lib/types";

export type EventPodium = {
  [gender: string]: {
    [place: number]: {
      team: ITeam;
      resultInMs: number;
    } | null;
  };
};

export type BestSportsmen = {
  [gender: string]: {
    runner: IUser;
    finalResultInMs: number;
  };
};

export type BestJokerPair = {
  [gender: string]: {
    runners: IRunnerResult[];
    finalResultInMs: number;
  };
};
