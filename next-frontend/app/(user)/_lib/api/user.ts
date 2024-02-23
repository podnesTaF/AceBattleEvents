import { AuthenticatedUser, IUser } from "@/app/(user)/_lib/types";
import { AxiosInstance } from "axios";

export const UserApi = (instance: AxiosInstance) => ({
  async login(credentials: { email?: string; password?: string }) {
    const { data } = await instance.post<{
      token: string;
      user: AuthenticatedUser;
    }>("/auth/login", {
      ...credentials,
    });
    return data;
  },

  async getMe() {
    const { data } = await instance.get<IUser>("/users/me");
    return data;
  },

  async updateMyProfile(payload: Partial<IUser>) {
    const { data } = await instance.patch<IUser>("/users/profile", payload);
    return data;
  },
});
