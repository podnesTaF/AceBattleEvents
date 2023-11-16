import { api } from "@lib/common/services/api";
import { IUser } from "../models";

export const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<IUser, number>({
      query: (userId) => ({
        url: `/users/${userId}`,
        providesTags: (result: IUser) => ["User"],
      }),
    }),
  }),
});

export const { useFetchUserQuery } = UserApi;
