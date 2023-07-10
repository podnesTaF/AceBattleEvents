import { ITeam, ITeamEvent, ReqTeam } from "@/models/ITeam";
import { api } from "./api";

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addTeam: builder.mutation<ITeam, ReqTeam>({
      query: (body) => ({
        url: "/teams",
        method: "POST",
        body,
      }),
    }),
    fetchAllTeams: builder.query<
      { teams: ITeam[]; totalPages: number },
      { params: string; page: number }
    >({
      query: ({ params, page }) => `/teams?${params}&page=${page}}`,
    }),
    fetchTeamsByUserId: builder.query<ITeam[], void>({
      query: () => `/teams?user=true`,
    }),
    regiterTeam: builder.mutation<
      ITeam,
      { teamId: number; eventId: number; txHash: string; wallet: string }
    >({
      query: (body) => ({
        url: `/teams/register`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Registration"],
    }),
    getRegistrations: builder.query<
      { teamsForEvents: ITeamEvent[]; totalPages: number },
      { page: number; limit: number }
    >({
      query: ({ page, limit }) =>
        `/teams/registrations?page=${page}&limit=${limit}`,
      providesTags: ["Registration"],
    }),
    fetchTeam: builder.query<ITeam, number>({
      query: (id) => `/teams/${id}`,
    }),
  }),
});

export const {
  useAddTeamMutation,
  useFetchTeamsByUserIdQuery,
  useRegiterTeamMutation,
  useGetRegistrationsQuery,
  useFetchAllTeamsQuery,
  useFetchTeamQuery,
} = teamApi;
