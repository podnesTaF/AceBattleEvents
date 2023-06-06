import { IEvent } from "@/models/IEvent";
import { AxiosInstance } from "axios";

export const EventsApi = (instance: AxiosInstance) => ({
  async getAllEvents(filters: any, currPage: number) {
    const params = filters.reduce(
      (acc: string, curr: { type: string; value: string }, i: number) =>
        i === 0
          ? acc + `${curr.type}=${curr.value}`
          : acc + `&${curr.type}=${curr.value}`,
      ""
    );

    console.log("params", params);
    const { data } = await instance.get<{
      totalPages: number;
      events: IEvent[];
    }>(`events?${params}&page=${currPage}&limit=5`);

    return data;
  },
});
