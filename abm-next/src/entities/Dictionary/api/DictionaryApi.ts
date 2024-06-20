import { Api } from "@/src/shared/api";
import { AxiosInstance } from "axios";
import { ICountry } from "../../Country";

export class DictionaryApi extends Api {
  super(instance: AxiosInstance) {
    this.instance = instance;
  }

  async getCountries() {
    const { data } = await this.instance.get<{ id: number; name: string }[]>(
      `/countries/dictionary`
    );

    return data;
  }

  async getFullCountries() {
    const { data } = await this.instance.get<ICountry[]>(`/countries`);

    return data;
  }

  async getGenders() {
    const { data } = await this.instance.get<{ id: number; name: string }[]>(
      `/genders/dictionary`
    );

    return data;
  }

  async getDistances() {
    const { data } = await this.instance.get<{ id: number; name: string }[]>(
      `/distances/dictionary`
    );

    return data;
  }
}
