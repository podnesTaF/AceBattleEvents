import { createApiInstance } from "@/src/shared/api";
import { Session } from "next-auth";
import { IUser } from "../../User";
import { AuthenticatedUser, CreateUserDto } from "../model";

export class AuthApi {
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

  async register(dto: CreateUserDto) {
    const { data } = await this.instance.post<AuthenticatedUser>(
      "/auth/register",
      dto
    );
    return data;
  }

  async verifyEmailStatus() {
    const { data } = await this.instance.get<boolean>("/users/verify-status");
    return data;
  }

  async sendConfirmationEmail(token: string) {
    const { data } = await this.instance.post<void>(
      "/users/email-confirmation",
      {
        token,
      }
    );
  }

  async verifyEmail(token: string) {
    const { data } = await this.instance.post<IUser>("/users/verify", {
      ott: token,
    });

    return data;
  }

  async generateNewOtt(token: string) {
    const { data } = await this.instance.post<{ ott: string }>(
      "/ott/generate",
      {
        token,
      }
    );

    return data;
  }
}

export default AuthApi;
