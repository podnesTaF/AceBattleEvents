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

  async getUserIfExists(email?: string | null) {
    const { data } = await instance.get<AuthenticatedUser>(
      `/users/exists/${email}`
    );
    return data;
  },

  async getMe() {
    const { data } = await instance.get<IUser>("/users/me");
    return data;
  },

  async updateMyProfile(dto: Partial<IUser>) {
    const { data } = await instance.patch<IUser>("/users/profile", dto);
    return data;
  },
  async updateMyProfileImage(formData: FormData) {
    const { data } = await instance.patch<IUser>("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  async getCountries() {
    const { data } = await instance.get<{ id: number; name: string }[]>(
      "/countries/names"
    );
    return data;
  },
});
