import { AxiosInstance } from "axios";
import { ICountry } from "~/lib/types";

export const DictionaryApi = (instance: AxiosInstance) => ({
  async getCountries() {
    const { data } = await instance.get<{ id: number; name: string }[]>(
      `/countries/dictionary`
    );

    return data;
  },

  async getFullCountries() {
    const { data } = await instance.get<ICountry[]>(`/countries`);

    return data;
  },

  async getGenders() {
    const { data } = await instance.get<{ id: number; name: string }[]>(
      `/genders/dictionary`
    );

    return data;
  },

  async getDistances() {
    const { data } = await instance.get<{ id: number; name: string }[]>(
      `/distances/dictionary`
    );

    return data;
  },
});
