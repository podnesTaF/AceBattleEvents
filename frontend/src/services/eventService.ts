import { IEvent } from "@/models/IEvent";
import { api } from "./api";

export const eventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchEvents: builder.query<
      { events: IEvent[]; totalPages: number },
      { params: string; currPage: number }
    >({
      query: ({ params, currPage }) => ({
        url: `events?${params}&page=${currPage}&limit=5`,
      }),
      providesTags: (result) => ["Event"],
    }),
    fetchEvent: builder.query<IEvent, string>({
      query: (eventId) => ({
        url: "/events/" + eventId,
      }),
      providesTags: (result) => ["Event"],
    }),
    addEvent: builder.mutation<IEvent, any>({
      query: (body) => ({
        url: "/events",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useFetchEventsQuery, useFetchEventQuery, useAddEventMutation } =
  eventApi;
