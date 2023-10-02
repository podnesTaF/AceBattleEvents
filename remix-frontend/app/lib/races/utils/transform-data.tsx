import { RunnerResultDetails } from "~/components";
import JokerResultDetails from "~/components/races/JokerResultDetails";
import { formatDate, getCategoryByDoB, getMeters, getPace } from "~/lib/utils";
import { IRace, IRunnerResult, ITeamResult } from "../types";

export const transformRaceToTable = (races: IRace[]) => {
  return races.map((race) => ({
    date: new Date(race.startTime).toLocaleDateString(),
    event: race.event.title,
    category: "outdoor",
    battle: getBattle(race),
    details: {
      link: "/race/" + race.id,
      value: "details",
    },
  }));
};

export const transformForAdminRace = (races: IRace[]) => {
  return transformRaceToTable(races).map((r, i) => ({
    ...r,
    battle: !races[i].winner ? "not finished" : r.battle,
    edit: {
      link: "/admin/races/add?raceId=" + races[i].id,
      value: "edit",
    },
  }));
};

export const getTeamResult = (teamResult: ITeamResult, isWinner: boolean) => {
  let res =
    teamResult.team.name + " / " + msToMinutesAndSeconds(teamResult.resultInMs);

  return isWinner ? "🏆 " + res : res;
};

export const getBattle = (race: IRace) => {
  return race.teamResults
    ?.map((teamResult: ITeamResult) =>
      getTeamResult(teamResult, race.winner?.id === teamResult.team.id)
    )
    .join(" vs ");
};

export const getBattleName = (race: IRace) => {
  return race.teamResults
    ?.map((teamResult: ITeamResult) => teamResult.team.name)
    .join(" vs ");
};

export function msToMinutesAndSeconds(ms?: number): string | null {
  if (!ms) return null;
  const totalSeconds = Math.floor(ms / 1000);

  const remainingMilliseconds = ms % 1000;

  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  const formattedMilliseconds = String(remainingMilliseconds).padStart(3, "0");

  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds.slice(
    0,
    2
  )}`;
}

export const transformDataToSelect = (
  data: { id: number; name?: string; title?: string }[]
) => {
  return data.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.id]: curr.name || curr.title,
    }),
    {}
  );
};

export const teamResultsTable = (teamResults: ITeamResult[]) => {
  return teamResults.map((teamResult) => ({
    id: teamResult.id,
    team: {
      id: teamResult.team.id,
      name: teamResult.team.name,
      link: "/teams/" + teamResult.team.id,
    },
    date: formatDate(teamResult.race.startTime),
    resultInMs: teamResult.resultInMs,
    race: teamResult.race.teams
      ?.reduce((acc, curr) => (acc += curr.name + " vs "), "")
      .slice(0, -4),
    event: {
      id: teamResult.race?.event.id,
      name: teamResult.race?.event.title,
      link: "/events/" + teamResult.race.event.id,
    },
    runnerResults: teamResult.runnerResults.map((runnerResult) => ({
      runner: runnerResult.runner.name + " " + runnerResult.runner.surname,
      gender: runnerResult.runner.gender,
      category: getCategoryByDoB(runnerResult.runner.dateOfBirth),
      distance: runnerResult.distance,
      finalResultInMs: runnerResult.finalResultInMs,
      records: "",
    })),
  }));
};

export const getResultIsMs = (result: string) => {
  const [minutes, sAndMs] = result.split(":");
  const [seconds, milliseconds] = sAndMs.split(".");

  return (
    Number(minutes) * 60 * 1000 + Number(seconds) * 1000 + Number(milliseconds)
  );
};

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

export const getPacersJokersResultTable = (
  race: IRace
): {
  sportsmen: string;
  team: string;
  totalResult: string;
  expand: {
    component: JSX.Element;
  };
}[] => {
  if (!race.teamResults) return [];
  return race.teamResults.reduce((acc: any[], curr: ITeamResult) => {
    const pacersJokers = curr.runnerResults.filter((res) => res.runnerType);

    const firstPair = pacersJokers.filter(
      (res) => res.runnerType === "pacer-1" || res.runnerType === "joker-1"
    );

    const secondPair = pacersJokers.filter(
      (res) => res.runnerType === "pacer-2" || res.runnerType === "joker-2"
    );

    const firstPairResult = firstPair.find(
      (res) => res.runnerType === "joker-1"
    )?.finalResultInMs;
    const secondPairResult = secondPair.find(
      (res) => res.runnerType === "joker-2"
    )?.finalResultInMs;

    const firstPairObj = {
      sportsmen: firstPair
        .map(
          (res) =>
            res.runner.name +
            " " +
            res.runner.surname +
            ` (${res.runnerType.slice(0, -2)})`
        )
        .join(" / "),
      team: curr.team.name,
      "total result": msToMinutesAndSeconds(firstPairResult),
      expand: {
        component: <JokerResultDetails runnerResults={firstPair} />,
      },
    };

    const secondPairObj = {
      sportsmen: secondPair
        .map(
          (res) =>
            res.runner.name +
            " " +
            res.runner.surname +
            ` (${res.runnerType.slice(0, -2)})`
        )
        .join(" / "),
      team: curr.team.name,
      "total result": msToMinutesAndSeconds(secondPairResult),
      expand: {
        component: <JokerResultDetails runnerResults={secondPair} />,
      },
    };

    return [...acc, firstPairObj, secondPairObj].sort(
      (a, b) => a.finalResultInMs - b.finalResultInMs
    );
  }, []);
};

export const getRunnerResultsTable = (runnerResults: IRunnerResult[]) => {
  return runnerResults.map((runnerResult) => ({
    rank: runnerResult.runner.rank !== 9999 ? runnerResult.runner.rank : "-",
    runner: {
      link: "/profile/" + runnerResult.runner.id,
      value: runnerResult.runner.name + " " + runnerResult.runner.surname,
    },
    "cat.": getCategoryByDoB(runnerResult.runner.dateOfBirth),
    distance: getMeters(runnerResult.distance) + " m",
    Result: msToMinutesAndSeconds(runnerResult.finalResultInMs) || "out",
    pace:
      getPace(
        runnerResult.splits[runnerResult.splits.length - 1].resultInMs,
        runnerResult.splits[runnerResult.splits.length - 1].distance,
        runnerResult.splits[0]
      ) + " / km",
    records:
      runnerResult.runner?.personalBests?.find(
        (pb) => pb.distance === runnerResult.distance
      )?.id === runnerResult.id
        ? "PB"
        : "-",
    expand: {
      component: <RunnerResultDetails runnerResult={runnerResult} />,
    },
  }));
};
