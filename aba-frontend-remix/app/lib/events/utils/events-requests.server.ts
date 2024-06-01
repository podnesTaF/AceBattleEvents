import axios from "axios";
import { IEvent } from "../types";

export const getEvents = async ({
  params,
}: {
  params?: string;
  currPage?: number;
}): Promise<{ events: IEvent[]; totalPages: number; error: boolean }> => {
  try {
    const { data: eventsData } = await axios.get<{
      events: IEvent[];
      totalPages: number;
    }>(`https://abe-server.up.railway.app/api/v1/events?${params}&limit=5`);

    return {
      events: eventsData.events,
      totalPages: eventsData.totalPages,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return { events: [], totalPages: 0, error: true };
  }
};

export const getEvent = async (id: string): Promise<IEvent | null> => {
  try {
    const { data: eventData } = await axios.get<IEvent>(
      `https://abe-server.up.railway.app/api/v1/events/${id}`
    );

    return eventData;
  } catch (e) {
    console.log(e);
    return null;
  }
};
