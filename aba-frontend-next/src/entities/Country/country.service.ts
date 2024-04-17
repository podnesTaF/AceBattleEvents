import { api } from "@/src/shared/api";

export const CountryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCountryNames: builder.query<{ id: number; name: string }[], void>({
      query: () => "countries/names",
      providesTags: ["Country"],
    }),
  }),
});

export const { useGetCountryNamesQuery } = CountryApi;
