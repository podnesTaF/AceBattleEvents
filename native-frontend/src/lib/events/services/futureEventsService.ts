import { api } from "@lib/services";
import { IFutureEvent } from "../models";

export const FutureEventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchFutureEvents: builder.query<IFutureEvent[], void>({
      query: () => ({
        url: `/future-events`,
      }),
      providesTags: (result) => ["FutureEvent"],
    }),
  }),
});

export const { useFetchFutureEventsQuery } = FutureEventApi;
