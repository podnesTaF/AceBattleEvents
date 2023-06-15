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
  }),
});

export const {
  useAddTeamMutation,
  useFetchTeamsByUserIdQuery,
  useRegiterTeamMutation,
  useGetRegistrationsQuery,
} = teamApi;
