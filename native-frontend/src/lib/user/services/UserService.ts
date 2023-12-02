import { api } from "@lib/common/services/api";
import { UpdateUserDto } from "../dto";
import { IUser } from "../models";

export const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<IUser, { userId: number; authId?: number }>({
      query: ({ userId, authId }) => ({
        url: `/users/${userId}?authId=${authId || ""}`,
      }),
      providesTags: ["User"],
    }),
    fetchUserInitialData: builder.query<IUser, void>({
      query: () => ({
        url: `/users/me`,
      }),
      providesTags: ["User"],
    }),
    updateUserData: builder.mutation<IUser, UpdateUserDto>({
      query: (dto) => ({
        url: `/users/profile-data`,
        method: "PATCH",
        body: dto,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserPassword: builder.mutation<
      void,
      {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
      }
    >({
      query: (dto) => ({
        url: "/users/password",
        method: "PATCH",
        body: dto,
      }),
    }),
  }),
});

export const {
  useFetchUserQuery,
  useFetchUserInitialDataQuery,
  useUpdateUserDataMutation,
  useUpdateUserPasswordMutation,
} = UserApi;
