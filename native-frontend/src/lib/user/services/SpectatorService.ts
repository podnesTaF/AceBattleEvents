import { api } from "@lib/common/services/api";
import { IViewer } from "../models";

export const SpectatorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchSpectatorRegistrations: builder.query<IViewer[], void>({
      query: () => ({
        url: "/viewer-registrations/my-registrations",
      }),
      providesTags: () => ["Registrations"],
    }),
  }),
});

export const { useFetchSpectatorRegistrationsQuery } = SpectatorApi;
