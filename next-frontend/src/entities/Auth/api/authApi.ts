import { createApiInstance } from "@/src/shared/api";
import { Session } from "next-auth";
import { AuthenticatedUser } from "../../../../../../Cross Fit Factory/my-cfit-factory-front/src/entities/Auth";

class AuthApi {
  private instance;

  constructor(session?: Session | null) {
    this.instance = createApiInstance(session);
  }

  async login(credentials: { email?: string; password?: string }) {
    const { data } = await this.instance.post<{
      token: string;
      user: AuthenticatedUser;
    }>("/auth/login", credentials);
    return data;
  }

  async loginWithGoogle(token: string) {
    const { data } = await this.instance.post<AuthenticatedUser>(
      "/auth/google",
      { token }
    );
    return data;
  }

  async getUserIfExists(email?: string | null) {
    const { data } = await this.instance.get<AuthenticatedUser>(
      `/users/exists/${email}`
    );
    return data;
  }

  async googleRegister(dto: { id_token: string }) {
    const { data } = await this.instance.post<AuthenticatedUser>(
      "/auth/google-register",
      dto
    );
    return data;
  }
}

export default AuthApi;
