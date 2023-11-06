import { IRace, IRunnerResult, ITeam } from "@lib/models";

export type ITeamResult = {
    id: number;
    resultInMs: number;
    race: IRace;
    team: ITeam;
    runnerResults: IRunnerResult[];
  };
  