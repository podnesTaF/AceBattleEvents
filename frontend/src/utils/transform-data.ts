import { IEvent, ILocation } from "@/models/IEvent";
import { ITeam } from "@/models/ITeam";

export const transformIntoEventsTable = (data: IEvent[]) => {
  return data.map((event) => {
    const { title, date, location, id, teamsCount } = event;
    const formated = new Date(date);
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

export const transformIntoTeamsTable = (data: ITeam[]) => {
  return data.map((team) => {
    const { name, country, membersCount, club, coach } = team;

    return {
      name,
      country,
      members: membersCount,
      club,
      coach: coach.name + " " + coach.surname,
    };
  });
};

export const getParamsFromFilters = (filters: any[]): string => {
  const params: string = filters.reduce(
    (acc: string, curr: { type: string; value: string }, i: number) =>
      i === 0
        ? acc + `${curr.type}=${curr.value}`
        : acc + `&${curr.type}=${curr.value}`,
    ""
  );

  return params;
};

export const transformAddress = (location: ILocation): string => {
  return (
    location.street +
    ", " +
    location.city +
    ", " +
    location.country +
    ", " +
    location.postalCode
  );
};
