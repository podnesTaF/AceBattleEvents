import { IEvent } from "../types";

export const transformIntoEventsTable = (data: IEvent[]) => {
  return data.map((event) => {
    const { title, startDateTime, location, id, teamsCount } = event;
    const formated = new Date(startDateTime);
    const formattedDate = formated.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return {
      title,
      date: formattedDate,
      country: location.country,
      organisators: "ACE BATTLE ASSOCIATION",
      details: {
        link: "/calendar/" + id,
        value: "details",
      },
    };
  });
};
