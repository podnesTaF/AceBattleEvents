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
    }>(`http://localhost:4000/api/v1/events?${params}&limit=5`);

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
