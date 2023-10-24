import { UserResult } from "~/lib/types";
import { formatDate, msToMinutesAndSeconds } from "~/lib/utils";
import { IRunner } from "../types";

export const transformDataAthletes = (data: IRunner[]) => {
  return data.map((runner: IRunner, i) => ({
    rank: runner.rank || "-",
    name: runner.user.name + " " + runner.user.surname,
    gender: runner.gender,
    "date of birth": formatDate(runner.dateOfBirth),
    club: runner.club?.name || "no club",
    country: runner.user.country?.name,
    profile: {
      link: "/profile/" + runner.user.id,
      value: "visit page",
    },
  }));
};

export const transformUserResultsToTable = (userResults: UserResult[]) => {
  return userResults.map((userResult) => ({
    date: new Date(userResult.race_startTime).toLocaleDateString(),
    event: {
      link: "/events/" + userResult.event_id,
      value: userResult.event_title,
    },
    distance: (userResult.runnerResult_distance / 100).toFixed(2) + " m",
    result:
      msToMinutesAndSeconds(userResult.runnerResult_finalResultInMs) || "out",
    place: userResult.winner_id === userResult.team_id ? "🏆" : "2",
    details: {
      link: "/race/" + userResult.race_id,
      value: "details",
    },
  }));
};
