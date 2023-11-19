import { api } from "@lib/common/services/api";
import { UpdateUserDto } from "../dto";
import { IUser } from "../models";

export const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<IUser, number>({
      query: (userId) => ({
        url: `/users/${userId}`,
        providesTags: (result: IUser, error: any, userId: number) => {
          return result ? [{ type: "User", id: userId }] : [];
        },
      }),
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
  useUpdateUserDataMutation,
  useUpdateUserPasswordMutation,
} = UserApi;
