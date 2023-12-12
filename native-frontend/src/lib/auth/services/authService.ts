import { api } from "@lib/common/services/api";
import { IUser, LoginUserRequest } from "@lib/models";
import { SubmitUserType } from "@lib/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    console.log("Error storing token:", error);
  }
};

export const AuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUser, LoginUserRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      transformResponse: async (response: IUser) => {
        await storeToken(response.token);
        return response;
      },
      invalidatesTags: ["Auth"],
    }),
    registerUser: builder.mutation<IUser, SubmitUserType>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPasswordRequest: builder.mutation<{ message: string }, string>({
      query: (email) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

export const {
  useResetPasswordRequestMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} = AuthApi;
