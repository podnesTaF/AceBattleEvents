import { AxiosInstance } from "axios";
import { IUser } from "~/lib/user/types/IUser";

export const UserApi = (instance: AxiosInstance) => ({
  async registerUser(data: IUser) {
    try {
      const { data: userData } = await instance.post<IUser>(
        `/auth/register`,
        data
      );
      return userData;
    } catch (error: any) {
      throw new Error("Failed to register: " + error.message);
    }
  },
  async loginUser(dto: {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
  }) {
    try {
      if (!dto.email || !dto.password)
        throw new Error("Email and password are required");
      const { data: userData } = await instance.post<IUser>(`/auth/login`, dto);
      return userData;
    } catch (error: any) {
      throw new Error("Failed to login: " + error.message);
    }
  },
  async getUser() {
    try {
      const { data: userData } = await instance.get<IUser>(`/users/me`);
      return userData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },
});
