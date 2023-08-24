import { IEvent } from "~/lib/types";
import { formatDate } from "~/lib/utils";

export const formatAdminEvents = (events: IEvent[]) => {
  return events.map((event) => ({
    title: event.title,
    country: event.location.country.name,
    date: formatDate(event.startDateTime),
    "event page": {
      link: `/events/${event.id}`,
      value: "Event Page",
    },
    edit: {
      link: `/admin/events/${event.id}`,
      value: "edit",
    },
  }));
};
