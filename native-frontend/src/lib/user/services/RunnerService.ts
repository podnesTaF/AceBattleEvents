import { api } from "@lib/common/services/api";
import { IRunner, ITeamEvent, RunnerPreview, UserResult } from "@lib/models";

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
    getRunnerResults: builder.query<
      {
        results: UserResult[];
        totalPages: number;
      },
      {
        page?: number;
        limit?: number;
        resultYear?: string;
        runnerId: number;
      }
    >({
      query: ({ runnerId, limit, page, resultYear }) => ({
        url: `/runner-results/user/${runnerId}?limit=${limit || ""}&page=${
          page || ""
        }&year=${resultYear}`,
      }),
    }),
    getRunnerCompetitions: builder.query<
      ITeamEvent[],
      {
        past?: boolean;
        runnerId: number;
        year?: string;
      }
    >({
      query: ({ past, runnerId, year }) => ({
        url: `/teams/${runnerId}/user-registrations?past=${past || ""}&year=${
          year || ""
        }`,
      }),
    }),
  }),
});

export const {
  useGetAthletesQuery,
  useGetTopAthletesQuery,
  useGetRunnerPreviewsQuery,
  useGetRunnerResultsQuery,
  useGetRunnerCompetitionsQuery,
} = RunnerApi;
