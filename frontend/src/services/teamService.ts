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
  }),
});

export const { useAddTeamMutation } = teamApi;
