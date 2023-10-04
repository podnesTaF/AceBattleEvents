import { ITeam } from "~/lib/teams/types";
import { IRunner } from "~/lib/user/types/IUser";
import { getAgeCategory } from "./date-formaters";

export const transformIntoTeamsTable = (data: ITeam[]) => {
  return data.map((team) => {
    const { name, country, membersCount, club, coach } = team;

    return {
      name,
      country: country.name,
      members: membersCount || 0,
      club: club.name || "no club",
      coach: coach.name + " " + coach.surname,
      details: {
        link: "/teams/" + team.id,
        value: "details",
      },
    };
  });
};

export const transfromIntoPlayersTable = (data: IRunner[]) => {
  return data.map((player) => {
    const { user, dateOfBirth } = player;

    if (!dateOfBirth) return null;

    return {
      name: user?.name,
      surname: user?.surname,
      dateOfBirth: new Date(dateOfBirth).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      cat: getAgeCategory(dateOfBirth),
    };
  });
};

export const transformIntoMembers = (runners: IRunner[]) => {
  return runners.map((runner) => ({
    name: runner.user.name + " " + runner.user.surname,
    gender: runner.gender,
    "date of birth": new Date(runner.dateOfBirth || 0).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    ),
    "member since": "28/07/2022",
    country: runner.user.country,
    results: {
      link: `/profile/${runner.user.id}/Results?scrollY=800`,
      value: "see profile",
    },
  }));
};
