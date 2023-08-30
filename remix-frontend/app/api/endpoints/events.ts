import { AxiosInstance } from "axios";
import { IEvent } from "~/lib/events/types";
import {
  CreateViewer,
  IViewer,
} from "~/lib/registrations/types/ViewerRegister";

export const EventsApi = (instance: AxiosInstance) => ({
  async getEvents(params?: string, currPage?: number) {
    try {
      const { data } = await instance.get<{
        totalPages: number;
        events: IEvent[];
      }>(`events?${params}&page=${currPage}&limit=5`);

      return {
        events: data.events,
        totalPages: data.totalPages,
        error: false,
      };
    } catch (e) {
      console.log(e);
      return { events: [], totalPages: 0, error: true };
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

  async getEvent(id: string) {
    try {
      const { data } = await instance.get<IEvent>(`events/${id}`);
      return data;
    } catch (e: any) {
      throw new Error(e.response?.data?.message || "error registering viewer");
    }
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
