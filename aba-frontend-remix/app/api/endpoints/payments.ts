import { AxiosInstance } from "axios";
import { IUser } from "~/lib/types";

export const PaymentsApi = (instance: AxiosInstance) => ({
  async handleSessionResult(sessionId: string) {
    const { data } = await instance.post<{
      user: IUser;
      status: "success" | "error";
    }>(`/payments/subscription/session-result`, { sessionId });
    return data;
  },
  async createCheckoutSession(userId: number, roleIds: number[]) {
    const { data } = await instance.post<string>(
      "/payments/subscription/session",
      { userId, roleIds }
    );
    return data;
  },
});
