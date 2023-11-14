import { api } from "@lib/services";
import { IRace } from "../models";

export const raceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFullRace: builder.query<IRace, number>({
      query: (id: number) => ({
        url: `/race/full-race/${id}`,
      }),
      providesTags: (result) => ["Race"],
    }),
  }),
});

export const { useGetFullRaceQuery } = raceApi;
