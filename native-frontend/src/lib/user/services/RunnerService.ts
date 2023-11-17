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
    getTopAthletes: builder.query<
      { male: IRunner[] | null; female: IRunner[] | null },
      { top: number; gender?: "male" | "female" }
    >({
      query: ({ top, gender }) => ({
        url: `/runners/top?count=${top}&gender=${gender || ""}`,
      }),
      providesTags: (result) => ["Runners"],
    }),
  }),
});

export const { useGetAthletesQuery, useGetTopAthletesQuery } = RunnerApi;
