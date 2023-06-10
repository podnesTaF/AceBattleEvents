import { ITeam, ReqTeam } from "@/models/ITeam";
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
    fetchTeamsByUserId: builder.query<ITeam[], number>({
      query: (userId) => `/teams?user=${userId}`,
    }),
    regiterTeam: builder.mutation<ITeam, { teamId: number; eventId: number }>({
      query: ({ teamId, eventId }) => ({
        url: `/teams/register`,
        method: "POST",
        body: { teamId, eventId },
      }),
    }),
  }),
});

export const {
  useAddTeamMutation,
  useFetchTeamsByUserIdQuery,
  useRegiterTeamMutation,
} = teamApi;
