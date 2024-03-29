import { AxiosInstance } from "axios";
import { IRunner } from "~/lib/user/types/IUser";

export const AthletesApi = (instance: AxiosInstance) => ({
  async getAthletes(params?: string) {
    try {
      const { data } = await instance.get<{
        athletes: IRunner[];
        totalPages: number;
      }>(`/runners?${params}&limit=9`);

      return {
        athletes: data.athletes,
        totalPages: data.totalPages,
        error: null,
      };
    } catch (error: any) {
      return {
        athletes: [],
        totalPages: 1,
        error: error.response.data.message,
      };
    }
  },
});
