import { AxiosInstance } from "axios";
import { IRace } from "~/lib/types";

export const RacesApi = (instance: AxiosInstance) => ({
  async getAllRaces(params?: string) {
    const { data } = await instance.get<{ races: IRace[]; totalPages: number }>(
      `/race?${params}&limit=5`
    );

    return data;
  },

  async createRace(dto: {
    eventId: number;
    startTime: string;
    teamIds: number[];
  }) {
    const { data } = await instance.post<IRace>(`/race`, dto);

    return data;
  },
});
