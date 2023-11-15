import { IRunner } from "@lib/models";
import { api } from "@lib/services";

export const RunnerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAthletes: builder.query<
      {
        athletes: IRunner[];
        totalPages: number;
      },
      string | undefined
    >({
      query: (params: string) => ({
        url: `/runners`,
      }),
      providesTags: (result) => ["Runners"],
    }),
  }),
});

export const { useGetAthletesQuery } = RunnerApi;
