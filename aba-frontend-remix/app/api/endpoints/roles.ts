import { AxiosInstance } from "axios";
import { IRole } from "~/lib/types";

export const RolesApi = (instance: AxiosInstance) => ({
  async getRoles(params?: string) {
    const { data } = await instance.get<IRole[]>(`/roles?${params}`);

    return data;
  },
});
