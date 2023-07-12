import { IMedia } from "@/models/IMedia";
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
      providesTags: ["User"],
    }),
    fetchTx: builder.query<ITransaction[], void>({
      query: () => "/users/get-transactions",
      providesTags: ["Transaction"],
    }),
    createTx: builder.mutation<
      ITransaction,
      { amount: number; type: string; txHash: string }
    >({
      query: ({ amount, type, txHash }) => ({
        url: "/users/create-transaction",
        method: "POST",
        body: { amount, type, txHash },
      }),
    }),
    updateImage: builder.mutation<any, { image: IMedia; userId: number }>({
      query: ({ image }) => ({
        url: "/users/image",
        method: "PATCH",
        body: { imageId: image.id },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useFetchMeQuery,
  useFetchTxQuery,
  useCreateTxMutation,
  useUpdateImageMutation,
} = userApi;
