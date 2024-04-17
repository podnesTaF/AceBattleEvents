import { Api } from "@/src/shared/api";

export class CountryApi extends Api {
  async getCountries() {
    const { data } = await this.instance.get<{ id: number; name: string }[]>(
      "/countries/names"
    );
    return data;
  }
}
