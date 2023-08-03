import { IClub } from "@/models/IClub";
import { api } from "./api";

export const clubApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchClubs: builder.query<IClub[], { params?: string }>({
      query: ({ params }) => "/clubs?" + params,
    }),
    fetchClub: builder.query<IClub, { id: number | null }>({
      query: ({ id }) => `/clubs/${id}`,
    }),
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

export const { useCreateClubMutation, useFetchClubsQuery, useFetchClubQuery } =
  clubApi;
