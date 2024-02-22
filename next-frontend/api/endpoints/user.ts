import { AuthenticatedUser } from "@/lib/users/types";
import { IUser } from "@/lib/users/types/IUser";
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
});
