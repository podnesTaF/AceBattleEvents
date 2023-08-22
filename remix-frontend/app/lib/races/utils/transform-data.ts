import { IRace, ITeamResult } from "../types";

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

export const getTeamResult = (teamResult: ITeamResult, isWinner: boolean) => {
  let res =
    teamResult.team.name + " / " + msToMinutesAndSeconds(teamResult.resultInMs);

  return isWinner ? "🏆 " + res : res;
};

export const getBattle = (race: IRace) => {
  return race.teamResults
    .map((teamResult) =>
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