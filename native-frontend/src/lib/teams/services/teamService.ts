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
    getTopTeams: builder.query<
      { male: ITeam[]; female: ITeam[] },
      { count?: number; gender?: "male" | "female" }
    >({
      query: () => ({
        url: `/teams/top`,
      }),
      providesTags: (result) => ["Team"],
    }),
    getTeamsByManager: builder.query<ITeam[], number | undefined>({
      query: (id) => ({
        url: `/teams/manager/${id}`,
      }),
      providesTags: ["Team"],
    }),
  }),
});

export const {
  useGetAllTeamsQuery,
  useGetTopTeamsQuery,
  useGetTeamsByManagerQuery,
} = ServiceApi;
