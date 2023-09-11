import { IAdmin, IEvent, IUser } from "~/lib/types";
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

export const defineMargin = (
  admin: IAdmin | null,
  user: IUser | null,
  isSmall?: boolean
) => {
  let mergin = 50;

  if (admin) {
    mergin += 44;
  }

  if (user || isSmall) {
    mergin += 16;
  }

  return mergin + "";
};
