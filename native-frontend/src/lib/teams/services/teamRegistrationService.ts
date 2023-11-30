import { api } from "@lib/common/services/api";
import { ITeamRegistration } from "../models";

export const teamRegistrationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerTeam: builder.mutation<
      ITeamRegistration,
      {
        coachId: number;
        teamId: number;
        eventId: number;
      }
    >({
      query: (data) => ({
        url: "/team-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => ["TeamRegistrations"],
    }),
  }),
});

export const { useRegisterTeamMutation } = teamRegistrationApi;
