import { api } from "@lib/services";
import { IEvent, IFutureEvent } from "../models";

export const FutureEventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchFutureEvents: builder.query<
      { events: IEvent[]; futureEvents: IFutureEvent[] },
      void
    >({
      query: () => ({
        url: `/future-events`,
      }),
      providesTags: (result) => ["FutureEvent"],
    }),
  }),
});

export const { useFetchFutureEventsQuery } = FutureEventApi;
