import { api } from "@lib/common/services/api";
import { IUser } from "../models";

export const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<IUser, number>({
      query: (userId) => ({
        url: `/users/${userId}`,
        providesTags: (result: IUser, error: any, userId: number) => {
          console.log(result, error, userId);
          return result ? [{ type: "User", id: userId }] : [];
        },
      }),
    }),
  }),
});

export const { useFetchUserQuery } = UserApi;
