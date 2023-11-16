import { api } from "@lib/common/services/api";
import { IRunner } from "@lib/models";

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
