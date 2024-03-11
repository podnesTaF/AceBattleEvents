import { createApiInstance } from "@/src/shared/api";
import { Session } from "next-auth";

export class CountryApi {
  private instance;

  constructor(session?: Session | null) {
    this.instance = createApiInstance(session);
  }

  async getCountries() {
    const { data } = await this.instance.get<{ id: number; name: string }[]>(
      "/countries/names"
    );
    return data;
  }
}
