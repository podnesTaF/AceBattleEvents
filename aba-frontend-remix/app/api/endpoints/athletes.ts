import { AxiosInstance } from "axios";
import { IRunner } from "~/lib/types";

export const AthletesApi = (instance: AxiosInstance) => ({
  async getAthletes(params?: string) {
    const { data } = await instance.get<{
      items: IRunner[];
      meta: {
        totalItems: number;
        totalPages: number;
      };
    }>(`/runners?${params}&limit=9`);

    return {
      ...data,
    };
  },
  async getTopAthletes(count: number) {
    const { data } = await instance.get<{
      male: IRunner[];
      female: IRunner[];
    }>(`/runners/top?count=${count}`);
    return data;
  },
});
