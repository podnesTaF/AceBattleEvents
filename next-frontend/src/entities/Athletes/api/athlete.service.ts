import { api } from "@/src/shared/api";
import { IMeta } from "@/src/shared/types";
import { IUser } from "../../User";

export const AthleteService = api.injectEndpoints({
  endpoints: (builder) => ({
    getAthletes: builder.query<
      { items: IUser[]; meta: IMeta },
      { params: string }
    >({
      query: ({ params }) => `/runners?${params}`,
      providesTags: ["Athletes"],
    }),
  }),
});

export const { useGetAthletesQuery } = AthleteService;
