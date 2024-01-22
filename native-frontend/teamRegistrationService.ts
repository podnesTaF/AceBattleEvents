import { api } from "@lib/common/services/api";
import { ITeamRegistration } from "./src/lib/teams/models";

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
        url: "/team-registrations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => ["TeamRegistrations"],
    }),
    findUserRegistrations: builder.query<
      ITeamRegistration[],
      { role?: string }
    >({
      query: ({ role }) => ({
        url: `/team-registrations/user?role=${role}`,
      }),
      providesTags: (result) => [{ type: "TeamRegistrations", id: "LIST" }],
    }),
    findRunnerRegistrations: builder.query<
      ITeamRegistration[],
      { runnerId: number; pastIncluded?: boolean }
    >({
      query: ({ runnerId, pastIncluded }) => ({
        url: `/team-registrations/runner/${runnerId}?pastIncluded=${
          pastIncluded || ""
        }`,
      }),
      providesTags: (result) => [{ type: "TeamRegistrations", id: "LIST" }],
    }),
  }),
});

export const {
  useRegisterTeamMutation,
  useFindUserRegistrationsQuery,
  useFindRunnerRegistrationsQuery,
} = teamRegistrationApi;
