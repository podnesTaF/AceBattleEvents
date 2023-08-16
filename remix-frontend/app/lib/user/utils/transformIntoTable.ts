import { formatDate } from "~/lib/events/utils/format-date";
import { IUser } from "../types/IUser";

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
