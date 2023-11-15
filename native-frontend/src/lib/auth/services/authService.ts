import { IUser, LoginUserRequest } from "@lib/models";
import { api } from "@lib/services";
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
  }),
});

export const { useLoginUserMutation } = AuthApi;
