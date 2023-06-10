import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<any, { balance: number }>({
      query: ({ balance }) => ({
        url: "/users",
        method: "PATCH",
        body: { balance },
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
