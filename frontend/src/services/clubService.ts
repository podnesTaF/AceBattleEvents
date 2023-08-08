import { IClub, JoinRequest } from "@/models/IClub";
import { api } from "./api";

export const clubApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchClubs: builder.query<IClub[], { params?: string }>({
      query: ({ params }) => "/clubs?" + params,
      providesTags: ["Club"],
    }),
    fetchClub: builder.query<IClub, { id: number | null }>({
      query: ({ id }) => `/clubs/${id}`,
      providesTags: ["Club"],
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
      invalidatesTags: ["Club"],
    }),
    sendJoinRequest: builder.mutation<
      JoinRequest,
      { motivation: string; clubId: number }
    >({
      query: ({ motivation, clubId }) => ({
        url: "/club-requests",
        method: "POST",
        body: { motivation, clubId },
      }),
      invalidatesTags: ["JoinRequest"],
    }),
    getJoinRequests: builder.query<JoinRequest[], { clubId: number | null }>({
      query: ({ clubId }) => `/club-requests/club/${clubId}`,
      providesTags: ["JoinRequest"],
    }),
    rejectJoinRequest: builder.mutation<
      { message: string },
      { clubId: number; userId: number }
    >({
      query: ({ clubId, userId }) => ({
        url: `/club-requests/club/${clubId}/decline`,
        method: "post",
        body: { userId },
      }),
      invalidatesTags: ["JoinRequest"],
    }),
    acceptJoinRequest: builder.mutation<
      { message: string },
      { clubId: number; userId: number }
    >({
      query: ({ clubId, userId }) => ({
        url: `/club-requests/club/${clubId}/accept`,
        method: "post",
        body: { userId },
      }),
      invalidatesTags: ["JoinRequest"],
    }),
  }),
});

export const {
  useCreateClubMutation,
  useFetchClubsQuery,
  useFetchClubQuery,
  useSendJoinRequestMutation,
  useGetJoinRequestsQuery,
  useRejectJoinRequestMutation,
  useAcceptJoinRequestMutation,
} = clubApi;
