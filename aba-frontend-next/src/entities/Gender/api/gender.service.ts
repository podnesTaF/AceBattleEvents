import { api } from "@/src/shared/api";
import { IGender } from "../model";

export const GenderService = api.injectEndpoints({
  endpoints: (builder) => ({
    getGenders: builder.query<IGender[], void>({
      query: () => `/genders`,
      providesTags: ["Genders"],
    }),
  }),
});

export const { useGetGendersQuery } = GenderService;
