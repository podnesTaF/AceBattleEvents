import { ITeam } from "~/lib/teams/types";
import { IUser } from "~/lib/user/types/IUser";
import { getAgeCategory } from "./date-formaters";

export const transformIntoTeamsTable = (data: ITeam[]) => {
  return data.map((team) => {
    const { name, country, membersCount, club, coach } = team;

    return {
      name,
      country: country.name,
      members: membersCount || 0,
      club: club || "no club",
      coach: coach.name + " " + coach.surname,
      details: {
        link: "/teams/" + team.id,
        value: "details",
      },
    };
  });
};

export const transfromIntoPlayersTable = (data: IUser[]) => {
  return data.map((player) => {
    const { name, surname, dateOfBirth } = player;

    if (!dateOfBirth) return null;

    return {
      name,
      surname,
      dateOfBirth: new Date(dateOfBirth).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      cat: getAgeCategory(dateOfBirth),
    };
  });
};

export const transformIntoMembers = (members: IUser[]) => {
  return members.map((member) => ({
    name: member.name + " " + member.surname,
    gender: member.gender,
    "date of birth": member.dateOfBirth,
    "member since": "28/07/2022",
    country: member.country?.name,
    results: {
      link: `/profile${member.id}`,
      value: "see profile",
    },
  }));
};
