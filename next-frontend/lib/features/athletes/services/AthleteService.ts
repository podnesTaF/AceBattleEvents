import { IUser } from "@/app/(user)/_lib/types";
import { IMeta } from "@/common/lib/types";
import { api } from "@/lib/api";

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
