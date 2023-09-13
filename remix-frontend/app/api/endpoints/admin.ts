import { AxiosInstance } from "axios";
import { IAdmin } from "~/lib/types";

export const AdminApi = (instance: AxiosInstance) => ({
  async loginAdmin(dto: {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
  }) {
    try {
      if (!dto.email || !dto.password)
        throw new Error("Email and password are required");
      const { data: userData } = await instance.post<IAdmin>(
        `/admin-auth/login`,
        dto
      );
      return userData;
    } catch (error: any) {
      throw new Error("Failed to login: " + error.message);
    }
  },
  async registerAdmin(data: { name: string; surname: string; email: string }) {
    try {
      const { data: userData } = await instance.post<IAdmin>(
        `/admin-auth/register`,
        data
      );
      return userData;
    } catch (error: any) {
      throw new Error("Failed to register: " + error.message);
    }
  },

  async getAdmins() {
    try {
      const { data: admins } = await instance.get<IAdmin[]>(`/admin`);
      return admins;
    } catch (error: any) {
      throw new Error("Failed to fetch admins: " + error.message);
    }
  },
  async getAdmin(id?: string) {
    try {
      const { data: admin } = await instance.get<IAdmin>(`/admin/${id}`);
      return admin;
    } catch (error: any) {
      throw new Error("Failed to fetch admin: " + error.message);
    }
  },
  async getMe() {
    try {
      const { data: admin } = await instance.get<IAdmin>(`/admin/me`);
      return admin;
    } catch (error: any) {
      throw new Error("Failed to fetch admin: " + error.message);
    }
  },
  async setNewPassword(data: { oldPassword: string; newPassword: string }) {
    try {
      const { data: admin } = await instance.post<{ message: string }>(
        `/admin-auth/change-password`,
        data
      );
      return admin;
    } catch (error: any) {
      throw new Error("Failed to change password: " + error.message);
    }
  },
});
