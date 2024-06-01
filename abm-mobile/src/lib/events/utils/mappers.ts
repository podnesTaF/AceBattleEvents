import { IEvent, IFutureEvent, MappedFutureEvent } from "../models";

export const mapFutureEvents = (eventsData?: {
  events: IEvent[];
  futureEvents: IFutureEvent[];
}): MappedFutureEvent[] => {
  if (!eventsData) return [];

  const { futureEvents } = eventsData;
  const mappedFutureEvents: MappedFutureEvent[] = futureEvents.map(
    (futureEvent) => {
      const { id, title, season, date, introImage } = futureEvent;
      return {
        id,
        title,
        season,
        date,
        introImage,
        infoAvailable: false,
      };
    }
  );

  const mappedEvents: MappedFutureEvent[] = eventsData.events.map((event) => {
    const { id, title, startDateTime, introImage } = event;
    return {
      id: id!,
      title,
      date: startDateTime,
      introImage,
      infoAvailable: true,
    };
  });

  return [...mappedEvents, ...mappedFutureEvents];
};
