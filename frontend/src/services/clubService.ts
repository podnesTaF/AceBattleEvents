import { api } from "./api";

export const clubApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createClub: builder.mutation<
      any,
      { name: string; city: string; country: string; logo: any; phone: string }
    >({
      query: ({ name, city, country, logo, phone }) => ({
        url: "/clubs",
        method: "POST",
        body: { name, city, country, logo, phone },
      }),
    }),
  }),
});

export const { useCreateClubMutation } = clubApi;
