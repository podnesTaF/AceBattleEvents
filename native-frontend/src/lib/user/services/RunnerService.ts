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
      {
        type?: "all" | "search";
        query?: string;
        limit?: number;
        page?: number;
        authId?: number;
      }
    >({
      query: ({ type, query, limit, page, authId }) => ({
        url: `/runners/previews?query=${query}&limit=${limit || ""}&page=${
          page || ""
        }&type=${type || "all"}&authId=${authId || ""}`,
      }),
      providesTags: (result) => ["RunnerPreview"],
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
    getRunnersByManager: builder.query<IRunner[], number | undefined>({
      query: (id) => ({
        url: `/runners/manager/${id}`,
      }),
      providesTags: ["Runners"],
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
    getMyFollowings: builder.query<IRunner[], void>({
      query: (id) => ({
        url: `/runners/followings`,
      }),
      providesTags: ["User"],
    }),
    getMyFollowers: builder.query<IRunner[], void>({
      query: (id) => ({
        url: `/users/followers`,
      }),
      providesTags: ["User"],
    }),
    followRunner: builder.mutation<{ id: number; userId: number }, number>({
      query: (id) => ({
        url: `/runners/follow/${id}`,
        method: "POST",
      }),
      invalidatesTags: (result) => {
        return ["RunnerPreview", "User"];
      },
    }),
    unfollowRunner: builder.mutation<{ id: number; userId: number }, number>({
      query: (id) => ({
        url: `/runners/unfollow/${id}`,
        method: "POST",
      }),
      invalidatesTags: (result) => {
        console.log("follow");
        return ["RunnerPreview", "User"];
      },
    }),
  }),
});

export const {
  useGetAthletesQuery,
  useGetTopAthletesQuery,
  useGetRunnerPreviewsQuery,
  useGetRunnerResultsQuery,
  useGetRunnersByManagerQuery,
  useGetRunnerCompetitionsQuery,
  useFollowRunnerMutation,
  useUnfollowRunnerMutation,
  useGetMyFollowersQuery,
  useGetMyFollowingsQuery,
} = RunnerApi;
