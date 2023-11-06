import { IRace, IRunnerResult, ITeamResult } from "@lib/models";

export const getFullDistanceAthletes = (race: IRace): IRunnerResult[] => {
    if (!race.teamResults) return [];
  
    return race.teamResults.reduce((acc: IRunnerResult[], curr: ITeamResult) => {
      const teamAthletes = curr.runnerResults.filter(
        (res: any) => !res.runnerType
      );
  
      teamAthletes.forEach((athlete) => {
        acc.push(athlete);
      });
      return acc.sort((a, b) => a.finalResultInMs - b.finalResultInMs);
    }, []);
  };