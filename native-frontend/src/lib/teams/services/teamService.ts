import { api } from "@lib/common/services/api";
import { ICoach, IManager } from "@lib/models";
import { ITeam } from "../models";

export const ServiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeams: builder.query<
      { teams: ITeam[]; totalPages: number },
      {
        gender?: string;
        country?: string;
        name?: string;
        page?: number;
        limit?: number;
        user?: any;
      }
    >({
      query: () => ({
        url: `/teams`,
      }),
      providesTags: (result) => ["Team"],
    }),
    getTeamInfo: builder.query<ITeam, number | undefined>({
      query: (id) => ({
        url: `/teams/info/${id}`,
      }),
    }),
    getTeam: builder.query<ITeam, number>({
      query: (id) => ({
        url: `/teams/${id}`,
      }),
      providesTags: ["Team"],
    }),
    getTopTeams: builder.query<
      { male: ITeam[]; female: ITeam[] },
      { count?: number; gender?: "male" | "female" }
    >({
      query: () => ({
        url: `/teams/top`,
      }),
      providesTags: (result) => ["Team"],
    }),
    getTeamsByEvent: builder.query<
      ITeam[],
      { eventId?: string; category?: string }
    >({
      query: ({ eventId, category }) => ({
        url: `/teams/event/${eventId}?category=${category || ""}`,
      }),
      providesTags: ["Team"],
    }),
    getTeamsByManager: builder.query<
      ITeam[],
      { unregistered?: boolean; eventId?: string; managerId?: number }
    >({
      query: ({ managerId, unregistered, eventId }) => ({
        url: `/teams/manager/${managerId}?unregistered=${
          unregistered || ""
        }&eventId=${eventId || ""}`,
      }),
      providesTags: ["Team"],
    }),
    getTeamManagerAndCoach: builder.query<
      { coach: ICoach; manager: IManager },
      { teamId: number }
    >({
      query: ({ teamId }) => ({
        url: `/teams/contacts/${teamId}`,
      }),
    }),
    getFollowingTeams: builder.query<ITeam[], void>({
      query: () => ({
        url: "/users/following-teams",
      }),
    }),
    followTeam: builder.mutation<{ followersCount: number | null }, number>({
      query: (id) => ({
        url: `/teams/follow/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Team"],
    }),
    unfollowTeam: builder.mutation<{ followersCount: number | null }, number>({
      query: (id) => ({
        url: `/teams/unfollow/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetAllTeamsQuery,
  useGetTopTeamsQuery,
  useGetTeamsByManagerQuery,
  useGetTeamsByEventQuery,
  useGetTeamQuery,
  useFollowTeamMutation,
  useUnfollowTeamMutation,
  useGetFollowingTeamsQuery,
  useGetTeamInfoQuery,
  useGetTeamManagerAndCoachQuery,
} = ServiceApi;
