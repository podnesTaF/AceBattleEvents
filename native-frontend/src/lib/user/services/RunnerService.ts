import { api } from "@lib/common/services/api";
import { IRunner, RunnerPreview } from "@lib/models";

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
    getRunnerPreviews: builder.query<
      { runners: RunnerPreview[]; totalPages: number },
      { type?: "all" | "search"; query?: string; limit?: number; page?: number }
    >({
      query: ({ type, query, limit, page }) => ({
        url: `/runners/previews?query=${query}&limit=${limit || ""}&page=${
          page || ""
        }&type=${type || "all"}`,
      }),
    }),
  }),
});

export const {
  useGetAthletesQuery,
  useGetTopAthletesQuery,
  useGetRunnerPreviewsQuery,
} = RunnerApi;
