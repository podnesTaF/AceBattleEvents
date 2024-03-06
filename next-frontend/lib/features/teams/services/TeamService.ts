import { api } from "@/lib/api";

export const TeamService = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeamPreviews: builder.query<
      { id: number; name: string; logoName: string }[],
      void
    >({
      query: () => `/teams/previews`,
      providesTags: ["TeamPreviews"],
    }),
  }),
});

export const { useGetTeamPreviewsQuery } = TeamService;
