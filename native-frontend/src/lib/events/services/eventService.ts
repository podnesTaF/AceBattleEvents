import { api } from "@lib/services";
import { EventInfo, EventResult, IEvent } from "../models";

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
    getEventInfo: builder.query<EventInfo, number>({
      query: (id) => ({
        url: `/events/info/${id}`,
      }),
      providesTags: (result, error, id) => [
        { type: "Event", id },
        "TeamRegistrations",
      ],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useFetchEventResultsQuery,
  useGetEventInfoQuery,
} = EventApi;
