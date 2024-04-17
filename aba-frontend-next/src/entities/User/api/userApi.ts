import { createApiInstance } from "@/src/shared/api";
import { Session } from "next-auth";
import { IUser } from "../model";

export class UserApi {
  private instance;

  constructor(session?: Session | null) {
    this.instance = createApiInstance(session);
  }

  async getMe() {
    const { data } = await this.instance.get<IUser>("/users/me");
    return data;
  }

  async updateMyProfile(dto: Partial<IUser>) {
    const { data } = await this.instance.patch<IUser>("/users/profile", dto);
    return data;
  }

  async updateMyProfileImage(formData: FormData) {
    const { data } = await this.instance.patch<IUser>(
      "/users/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
}
