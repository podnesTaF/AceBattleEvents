import { IRunner } from "~/lib/types";

export const transfromIntoPlayersTable = (data: IRunner[]) => {
  return data.map((player) => {
    return {
      name: player.firstName,
      surname: player.lastName,
      dateOfBirth: new Date(player.dateOfBirth).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  });
};
