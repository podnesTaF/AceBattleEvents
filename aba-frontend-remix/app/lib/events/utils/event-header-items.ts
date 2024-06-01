import { IEvent } from "../types";

export const getEventHeaderItems = (event: IEvent, isEventPast?: boolean) => {
  return [
    {
      title: "Event Home",
      href: `/events/${event.eventCode}`,
    },
    {
      title: "Rules",
      href: `/events/${event.eventCode}/rules`,
    },
  ];
};
