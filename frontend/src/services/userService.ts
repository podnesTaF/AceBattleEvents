import { ITransaction, IUser } from "@/models/IUser";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<any, { balance: number }>({
      query: ({ balance }) => ({
        url: "/users",
        method: "PATCH",
        body: { balance },
      }),
      invalidatesTags: ["Transaction"],
    }),
    fetchMe: builder.query<IUser, void>({
      query: () => "/users/me",
    }),
    fetchTx: builder.query<ITransaction[], void>({
      query: () => "/users/get-transactions",
      providesTags: ["Transaction"],
    }),
    createTx: builder.mutation<ITransaction, { amount: number; type: string }>({
      query: ({ amount, type }) => ({
        url: "/users/create-transaction",
        method: "POST",
        body: { amount, type },
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useFetchMeQuery,
  useFetchTxQuery,
  useCreateTxMutation,
} = userApi;
