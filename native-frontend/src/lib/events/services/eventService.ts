import { api } from "@lib/services";
import { EventResult, IEvent } from "../models";

export const EventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<IEvent[], void>({
      query: () => ({
        url: `/events`,
      }),
      providesTags: (result) => ["Event"],
    }),
    fetchEventResults: builder.query<EventResult, number>({
      query: (id) => ({
        url: `events/results/${id}`,
      }),
    }),
  }),
});

export const { useGetAllEventsQuery, useFetchEventResultsQuery } = EventApi;
