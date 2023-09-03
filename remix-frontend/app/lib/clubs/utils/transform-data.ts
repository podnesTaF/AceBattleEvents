import { msToMinutesAndSeconds } from "~/lib/races/utils/transform-data";
import { ITeam, TeamResult } from "~/lib/teams/types";
import { IUser } from "~/lib/types";
import { IClub } from "../types";

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
      link: "/race/" + result.raceId,
      value: "details",
    },
  }));
};

export const transformToClubData = (club?: IClub[] | null) => {
  if (!club) return [];
  return club.map((club) => ({
    name: {
      link: "/clubs/" + club.id,
      value: club.name,
    },
    country: club.country,
    "members count": club.members.length,
    "created at": new Date(club.createdAt).toLocaleDateString(),
    teams: getTeams(club.teams),
  }));
};

export const getTeams = (teams: ITeam[]): string => {
  const femaleLen = teams.filter((t) => t.gender === "female").length;
  const maleLen = teams.filter((t) => t.gender === "male").length;
  let finalStr = "";
  if (femaleLen && maleLen) {
    finalStr = femaleLen + " female + " + maleLen + " male";
  } else if (femaleLen) {
    finalStr = femaleLen + " female";
  } else if (maleLen) {
    finalStr = maleLen + " male";
  } else {
    finalStr = "No teams";
  }

  return finalStr;
};

export const transformToClubMembers = (members: IUser[]) => {
  return members.map((member) => ({
    name: member.name + " " + member.surname,
    "date of birth": member.dateOfBirth
      ? new Date(member.dateOfBirth).toLocaleDateString()
      : "N/A",
    email: member.email,
    "created at": new Date(member.createdAt).toLocaleDateString(),
    role: member.role,
    country: member.country.code,
    results:
      member.role === "runner"
        ? {
            link: "/profile/" + member.id + "/Results?scrollY=800",
            value: "results",
          }
        : "N/A",
  }));
};
