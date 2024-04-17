import { ITeam } from "../models";

export const getTeamFormValues = (
  team: ITeam
): {
  defaultValues: { [key: string]: any };
  newValues: { [key: string]: any };
} => {
  return {
    defaultValues: {
      id: team.id,
      name: team.name,
      city: team.city,
      gender: team.gender,
      coach: team.coach?.id,
      players: team.players.map((player) => player.id),
      logo: team.logo,
      teamImage: team.teamImage,
    },
    newValues: {
      name: team.name,
      city: team.city,
      gender: team.gender,
      coach: team.coach?.id,
      players: team.players.map((player) => player.id),
    },
  };
};
