import { api } from "@lib/common/services/api";
import { ICoach } from "@lib/models";

export const coachApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCoachesByManager: builder.query<ICoach[], { userId?: number }>({
      query: ({ userId }) => ({
        url: `/coaches/manager/${userId}`,
      }),
      providesTags: ["Coach"],
    }),
  }),
});

export const { useGetCoachesByManagerQuery } = coachApi;
