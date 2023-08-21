import { msToMinutesAndSeconds } from "~/lib/races/utils/transform-data";
import { TeamResult } from "~/lib/teams/types";

export const transformClubResults = (results: TeamResult[]) => {
  return results.map((result) => ({
    date: new Date(result.race_startTime).toLocaleDateString(),
    event: result.event_title,
    category: result.team_gender,
    team: {
      link: "/teams/" + result.teamId,
      value: result.team_name,
    },

    result: msToMinutesAndSeconds(result.teamResult_resultInMs),
    place: result.winner_id === result.team_id ? "🏆" : "2",
    details: {
      link: "/",
      value: "details",
    },
  }));
};
