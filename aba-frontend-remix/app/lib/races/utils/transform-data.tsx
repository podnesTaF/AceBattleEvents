import { RunnerResultDetails } from "~/components";
import JokerResultDetails from "~/components/races/JokerResultDetails";
import { formatDate, getCategoryByDoB, getMeters, getPace } from "~/lib/utils";
import { IRace } from "../types";
import { IRaceRunner } from "../types/runnerResults";
import { IRaceTeam } from "../types/teamResults";

export const transformRaceToTable = (races: IRace[]) => {
  return races.map((race) => ({
    date: new Date(race.startTime).toLocaleDateString(),
    event: race.eventRaceType.event.title,
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

export const getTeamResult = (raceTeam: IRaceTeam) => {
  let res =
    raceTeam.team.name + " / " + msToMinutesAndSeconds(raceTeam.totalTimeInMs);

  return raceTeam.won ? "🏆 " + res : res;
};

export const getBattle = (race: IRace) => {
  return race.raceTeams
    ?.map((raceTeam: IRaceTeam) => getTeamResult(raceTeam))
    .join(" vs ");
};

export const getBattleName = (race: IRace) => {
  return race.raceTeams
    ?.map((raceTeam: IRaceTeam) => raceTeam.team.name)
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

export const teamResultsTable = (raceTeam: IRaceTeam[]) => {
  return raceTeam.map((raceTeam) => ({
    id: raceTeam.id,
    team: {
      id: raceTeam.team.id,
      name: raceTeam.team.name,
      link: "/teams/" + raceTeam.team.id,
    },
    date: formatDate(raceTeam.race.startTime),
    resultInMs: raceTeam.totalTimeInMs,
    race: raceTeam.race.name,
    event: {
      id: raceTeam.race?.eventRaceType.event.id,
      name: raceTeam.race?.eventRaceType.event.title,
      link: "/events/" + raceTeam.race?.eventRaceType.event.eventCode,
    },
    runnerResults: raceTeam.raceRunners.map((raceRunner) => ({
      runner: raceRunner.runner.firstName + " " + raceRunner.runner.lastName,
      gender: raceRunner.runner.gender.name,
      category: getCategoryByDoB(raceRunner.runner.dateOfBirth),
      distance: raceRunner.splits.find((s) => s.finalSplit)?.distanceInCm,
      finalResultInMs: raceRunner.splits.find((s) => s.finalSplit)?.resultInMs,
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

export const getFullDistanceAthletes = (race: IRace): IRaceRunner[] => {
  if (!race.raceTeams) return [];

  return race.raceTeams.reduce((acc: IRaceRunner[], curr: IRaceTeam) => {
    const milers = curr.raceRunners.filter(
      (res) => res.runnerRole.name === "miler"
    );

    milers.forEach((miler) => {
      acc.push(miler);
    });
    return acc.sort((a, b) => {
      const aResult = a.splits.find((split) => split.finalSplit)?.resultInMs;
      const bResult = b.splits.find((split) => split.finalSplit)?.resultInMs;
      if (!aResult || !bResult) return 0;
      return aResult - bResult;
    });
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
  if (!race.raceTeams) return [];
  const pairs = race.raceTeams.reduce((acc: any[], curr: IRaceTeam) => {
    const pacersJokers = curr.raceRunners.filter(
      (res) =>
        res.runnerRole.name.includes("pacer") ||
        res.runnerRole.name.includes("joker")
    );

    const firstPair = pacersJokers.filter(
      (res) =>
        res.runnerRole.name === "pacer-1" || res.runnerRole.name === "joker-1"
    );

    const secondPair = pacersJokers.filter(
      (res) =>
        res.runnerRole.name === "pacer-2" || res.runnerRole.name === "joker-2"
    );

    const firstPairResult = firstPair
      .find((res) => res.runnerRole.name === "joker-1")
      ?.splits.find((s) => s.finalSplit)?.resultInMs;
    const secondPairResult = secondPair
      .find((res) => res.runnerRole.name === "joker-2")
      ?.splits.find((s) => s.finalSplit)?.resultInMs;

    const firstPairObj = {
      sportsmen: firstPair
        .map(
          (res) =>
            res.runner.firstName +
            " " +
            res.runner.lastName +
            ` (${res.runnerRole.name.slice(0, -2)})`
        )
        .join(" / "),
      team: curr.team.name,
      "total result": msToMinutesAndSeconds(firstPairResult),
      expand: {
        component: <JokerResultDetails raceRunners={firstPair} />,
      },
    };

    const secondPairObj = {
      sportsmen: secondPair
        .map(
          (res) =>
            res.runner.firstName +
            " " +
            res.runner.lastName +
            ` (${res.runnerRole.name.slice(0, -2)})`
        )
        .join(" / "),
      team: curr.team.name,
      "total result": msToMinutesAndSeconds(secondPairResult),
      expand: {
        component: <JokerResultDetails raceRunners={secondPair} />,
      },
    };

    return [...acc, firstPairObj, secondPairObj].sort(
      (a, b) => a.finalResultInMs - b.finalResultInMs
    );
  }, []);

  return pairs.sort(
    (a, b) =>
      getResultIsMs(a["total result"]) - getResultIsMs(b["total result"])
  );
};

export const getRunnerResultsTable = (raceRunners: IRaceRunner[]) => {
  return raceRunners.map((raceRunner) => ({
    rank: raceRunner.runner.rank !== 9999 ? raceRunner.runner.rank : "-",
    runner: {
      link: "/profile/" + raceRunner.runner.id,
      value: raceRunner.runner.firstName + " " + raceRunner.runner.lastName,
    },
    "cat.": getCategoryByDoB(raceRunner.runner.dateOfBirth),
    distance: raceRunner.splits.find((s) => s.finalSplit)?.distanceInCm
      ? getMeters(raceRunner.splits.find((s) => s.finalSplit)?.distanceInCm) +
        " m"
      : "Pacer",
    Result:
      msToMinutesAndSeconds(
        raceRunner.splits.find((s) => s.finalSplit)?.resultInMs
      ) || "out",
    pace:
      getPace(
        raceRunner.splits[raceRunner.splits.length - 1].resultInMs,
        raceRunner.splits[raceRunner.splits.length - 1].distanceInCm,
        raceRunner.splits.find((s) => s.firstSplit)
      ) + " / km",
    expand: {
      component: <RunnerResultDetails raceRunner={raceRunner} />,
    },
  }));
};
