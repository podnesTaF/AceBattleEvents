import { AxiosInstance } from "axios";
import { IClub } from "~/lib/clubs/types";
import { UserResult } from "~/lib/races/types/userResult";
import { IViewer } from "~/lib/registrations/types/ViewerRegister";
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
      return null;
    }
  },
  async getResetUser(token: string) {
    try {
      const { data: userData } = await instance.get<IUser>(
        `/reset-user/user/${token}`
      );
      return userData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },
  async getUserProfile(id: string) {
    try {
      const { data: userData } = await instance.get<IUser>(`/users/${id}`);
      return userData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },
  async updateImage(imageId: number) {
    try {
      const { data: userData } = await instance.patch<IUser>(`/users/image`, {
        imageId,
      });
      return userData;
    } catch (error: any) {
      throw new Error("Failed to update image: " + error.message);
    }
  },
  async getMyRegistrations() {
    try {
      const { data: registrations } = await instance.get<IViewer[]>(
        `/viewer-registrations/my-registrations`
      );
      return registrations;
    } catch (error) {
      console.log(error);
    }
  },
  async getFavoriteClubs(id: number) {
    try {
      const { data: clubs } = await instance.get<IClub[]>(
        `/users/${id}/favorite-clubs`
      );
      return clubs;
    } catch (error) {
      console.log(error);
    }
  },
  async getUserResults({
    id,
    page,
    resultYear,
    resultCategory,
    limit,
  }: {
    id: number;
    page: number;
    resultYear?: number;
    resultCategory?: string;
    limit?: number;
  }) {
    try {
      const { data: results } = await instance.get<{
        results: UserResult[];
        totalPages: number;
      }>(
        `/runner-results/user/${id}?page=${page}&limit=${limit || 5}&year=${
          resultYear || ""
        }&category=${resultCategory || ""}`
      );
      return results;
    } catch (error) {
      console.log(error);
    }
  },

  async updateProfile(data: any) {
    try {
      const { data: userData } = await instance.patch<IUser>(
        `/users/profile-data`,
        data
      );
      return userData;
    } catch (error: any) {
      throw new Error("Failed to update profile: " + error.message);
    }
  },
  async changePassword(data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    try {
      const { data: userData } = await instance.patch<IUser>(
        `/users/password`,
        data
      );
      return userData;
    } catch (error: any) {
      throw new Error("Failed to change password: " + error.message);
    }
  },

  async resetPasswordRequest(email: string) {
    try {
      const { data: userData } = await instance.post<{ message: string }>(
        `/auth/reset-password`,
        { email }
      );
      return userData;
    } catch (error: any) {
      throw new Error("Failed to reset password: " + error.message);
    }
  },

  async setNewPassword(
    userId: number,
    data: { newPassword: string; confirmPassword: string; token: string }
  ) {
    try {
      const { data: userData } = await instance.post<{ message: string }>(
        `/auth/change-password/${userId}`,
        data
      );
      return userData;
    } catch (error: any) {
      throw new Error("Failed to change password: " + error.message);
    }
  },

  async checkToken(token: string) {
    try {
      const { data: isValid } = await instance.get<boolean>(
        `/reset-user/check/${token}`
      );
      return isValid;
    } catch (error: any) {
      throw new Error("Failed to check token: " + error.message);
    }
  },
});
