import { api } from "@lib/services";
import { IUser } from "../models";

export const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<IUser, number>({
      query: (userId) => ({
        url: `/users/${userId}`,
        providesTags: (result: IUser) => [{ type: "User", id: result.id }],
      }),
    }),
  }),
});

export const { useFetchUserQuery } = UserApi;
