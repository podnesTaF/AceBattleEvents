import { api } from "@lib/services";
import { IEvent } from "../models";

export const EventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<IEvent[], void>({
      query: () => ({
        url: `/events`,
      }),
      providesTags: (result) => ["Event"],
    }),
  }),
});

export const { useGetAllEventsQuery } = EventApi;
