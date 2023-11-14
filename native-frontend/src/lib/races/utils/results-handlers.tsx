import { msToMinutesAndSeconds } from "@lib/common/utils";
import { IRace, ISplit, ITeam, ITeamResult } from "@lib/models";

export const getPace = (
  timeInMs: number,
  distance: number,
  firstSplit?: ISplit
) => {
  let originalTime = timeInMs;

  if (firstSplit) {
    if (firstSplit.resultInMs > 30000) {
      originalTime = timeInMs - firstSplit.resultInMs;
    }
  }
  const msPerCm = originalTime / distance;

  const msPerKm = msPerCm * 100000;

  return msToMinutesAndSeconds(msPerKm);
};

export const getMeters = (distanceInCm: number) => {
  return (distanceInCm / 100).toFixed(0);
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
  return race.teams?.map((team: ITeam) => team.name).join(" vs ");
};
