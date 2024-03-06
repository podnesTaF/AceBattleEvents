import { api } from "@/lib/api";
import { IGender } from "../types";

export const GenderService = api.injectEndpoints({
  endpoints: (builder) => ({
    getGenders: builder.query<IGender[], void>({
      query: () => `/genders`,
      providesTags: ["Genders"],
    }),
  }),
});

export const { useGetGendersQuery } = GenderService;
