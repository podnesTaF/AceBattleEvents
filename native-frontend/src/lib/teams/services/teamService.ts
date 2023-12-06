import { api } from "@lib/common/services/api";
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
} = ServiceApi;
