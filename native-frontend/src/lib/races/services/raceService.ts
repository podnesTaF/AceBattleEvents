import { api } from "@lib/services";
import { IRace, RaceWithCheckIn } from "../models";

export const raceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRacesByEvent: builder.query<RaceWithCheckIn[], string | undefined>({
      query: (eventId) => ({
        url: `/race/event?eventId=${eventId || ""}`,
      }),
      providesTags: (result) => ["Race"],
    }),
    getFullRace: builder.query<IRace, number>({
      query: (id: number) => ({
        url: `/race/full-race/${id}`,
      }),
      providesTags: (result) => ["Race"],
    }),
    checkInForRace: builder.mutation<
      { success: boolean },
      {
        runnerIds: number[];
        raceRegistrationId: number;
      }
    >({
      query: (dto) => ({
        url: `race-registrations/check-in`,
        method: "PATCH",
        body: dto,
      }),
      invalidatesTags: ["Race"],
    }),
  }),
});

export const {
  useGetFullRaceQuery,
  useCheckInForRaceMutation,
  useGetRacesByEventQuery,
} = raceApi;
