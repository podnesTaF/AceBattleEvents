import { createApiInstance } from "@/src/shared/api";
import { Session } from "next-auth";
import { IRunner } from "../model";

export class RunnerApi {
  private instance;

  constructor(session?: Session | null) {
    this.instance = createApiInstance(session);
  }

  async getAthletes(params?: string) {
    const { data } = await this.instance.get<{
      items: IRunner[];
      meta: {
        totalItems: number;
        totalPages: number;
      };
    }>(`/runners?${params}&limit=9`);

    return {
      ...data,
    };
  }

  async getTopAthletes(count: number) {
    const { data } = await this.instance.get<{
      male: IRunner[];
      female: IRunner[];
    }>(`/runners/top?count=${count}`);
    return data;
  }
}
