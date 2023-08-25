import { formatDate, getCategoryByDoB } from "~/lib/utils";
import { IRace, ITeamResult, ResultTableRow } from "../types";

export const transformRaceToTable = (races: IRace[]) => {
  return races.map((race) => ({
    date: new Date(race.startTime).toLocaleDateString(),
    event: race.event.title,
    category: "outdoor",
    battle: getBattle(race),
    details: {
      link: "/",
      value: "details",
    },
  }));
};

export const transformForAdminRace = (races: IRace[]) => {
  return transformRaceToTable(races).map((r, i) => ({
    ...r,
    battle: !races[i].winner ? "not finished" : r.battle,
    edit: {
      link: "/admin/races/edit/" + races[i].id,
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

export function msToMinutesAndSeconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(ms).padStart(3, "0");

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

export const teamResultsTable = (
  teamResults: ITeamResult[]
): ResultTableRow[] => {
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
