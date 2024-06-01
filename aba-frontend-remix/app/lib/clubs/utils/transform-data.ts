import { IRaceTeam } from "~/lib/races/types/teamResults";
import { msToMinutesAndSeconds } from "~/lib/races/utils/transform-data";
import { ITeam } from "~/lib/teams/types";
import { IUser } from "~/lib/types";
import { IClub } from "../types";

export const transformClubResults = (results: IRaceTeam[]) => {
  return results.map((result) => ({
    date: new Date(result.race.startTime).toLocaleDateString(),
    event: result.race.eventRaceType.event.title,
    category: result.team.gender.name,
    team: {
      link: "/teams/" + result.teamId,
      value: result.team.name,
    },

    result: msToMinutesAndSeconds(result.totalTimeInMs),
    place: result.won ? "🏆" : "2",
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
    country: club.country.name,
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
