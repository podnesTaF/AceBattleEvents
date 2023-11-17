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
  }),
});

export const { useGetAllTeamsQuery } = ServiceApi;
