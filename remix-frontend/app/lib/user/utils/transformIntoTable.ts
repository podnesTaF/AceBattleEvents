import { UserResult } from "~/lib/types";
import { formatDate, msToMinutesAndSeconds } from "~/lib/utils";
import { IUser } from "../types";

export const transformDataAthletes = (data: IUser[]) => {
  return data.map((runner: IUser) => ({
    name: runner.name + " " + runner.surname,
    gender: runner.gender,
    "date of birth": formatDate(runner.dateOfBirth),
    club: runner.club?.name || "no club",
    country: runner.country?.name,
    profile: {
      link: "/profile/" + runner.id,
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
    distance: (userResult.runnerResult_distance / 100).toFixed(2),
    result: msToMinutesAndSeconds(userResult.runnerResult_finalResultInMs),
    place: userResult.winner_id === userResult.team_id ? "🏆" : "2",
    details: {
      link: "/race/" + userResult.race_id,
      value: "details",
    },
  }));
};
