import { AxiosInstance } from "axios";
import { IEvent } from "~/lib/events/types";

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

  async getEvent(id: string) {
    try {
      const { data } = await instance.get<IEvent>(`events/${id}`);

      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
});
