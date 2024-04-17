import { AxiosInstance } from "axios";
import { EventShortform, IEvent, IFutureEvent } from "~/lib/events/types";
import { TimetableByDay } from "~/lib/events/types/ITimeTable";
import { IEventRaceType } from "~/lib/races/types/IEventRaceType";
import {
  CreateViewer,
  IViewer,
} from "~/lib/registrations/types/ViewerRegister";
import { EventRaceTypeResults } from "~/lib/types";

export const EventsApi = (instance: AxiosInstance) => ({
  async getEventPreviews(params?: string) {
    try {
      const { data } = await instance.get<{
        totalPages: number;
        events: IEvent[];
      }>(`events/previews?${params}&limit=5`);

      return {
        events: data.events,
        totalPages: data.totalPages,
        error: false,
      };
    } catch (e) {
      return { events: [], totalPages: 0, error: true };
    }
  },

  async getEventsShortform() {
    try {
      const { data } = await instance.get<EventShortform[]>(`events/shortform`);
      return data;
    } catch (e) {
      return [];
    }
  },

  async getEventsSnippet() {
    try {
      const { data } = await instance.get<{ title: string; id: number }[]>(
        `events/snippet`
      );

      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  },

  async getEventRaceTypes(eventId: number) {
    const { data } = await instance.get<IEventRaceType[]>(
      "event-race-types/event/" + eventId
    );

    return data;
  },

  async getEventResults(eventCode: string) {
    try {
      const { data } = await instance.get<{
        notFinished: number;
        eventTitle: string;
        eventRaceTypesResults: EventRaceTypeResults[];
        mainImageUrl: string;
      }>(`events/results/${eventCode}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async getEvent(value: string, cond?: string) {
    try {
      const { data } = await instance.get<
        IEvent & { timetableByDays: TimetableByDay[] }
      >(`events/${value}?cond=${cond}`);
      return data;
    } catch (e: any) {
      throw new Error(e.response?.data?.message || "error registering viewer");
    }
  },

  async getFututeEvents(params?: string) {
    const { data } = await instance.get<{ futureEvents: IFutureEvent[] }>(
      `event-previews?${params}`
    );
    return data;
  },

  async registerViewer(dto: CreateViewer) {
    try {
      const { data } = await instance.post<IViewer>(
        `/viewer-registrations`,
        dto
      );

      return data;
    } catch (e: any) {
      throw new Error(e.response?.data?.message);
    }
  },

  async addEvent(dto: IEvent) {
    try {
      const { data } = await instance.post<IEvent>(`events`, dto);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
});
