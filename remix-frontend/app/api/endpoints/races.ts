import { AxiosInstance } from "axios";
import { IRace, ITeamResult } from "~/lib/types";

export const RacesApi = (instance: AxiosInstance) => ({
  async getAllRaces(params?: string, isFinished?: boolean) {
    const { data } = await instance.get<{ races: IRace[]; totalPages: number }>(
      `/race?${params}&limit=5&isFinished=${isFinished || ""}`
    );

    return data;
  },

  async getRace(id: string) {
    try {
      const { data } = await instance.get<IRace>("race/" + id);

      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  },

  async getFullRace(id: string) {
    try {
      const { data: race } = await instance.get<IRace>("/race/full-race/" + id);

      return race;
    } catch (error) {
      console.log(error);
    }
  },

  async createRace(dto: {
    eventId: number;
    startTime: string;
    teamIds: number[];
  }) {
    const { data } = await instance.post<IRace>(`/race`, dto);

    return data;
  },

  async getAllResults(queries: string) {
    try {
      const { data } = await instance.get<{
        data: ITeamResult[];
        totalPages: number;
      }>("/team-results?" + queries + "&limit=5");

      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async updateRace(
    dto: {
      eventId: number;
      startTime: string;
      teamIds: number[];
    },
    raceId: number
  ) {
    try {
      const { data } = await instance.patch("/race/" + raceId + "/race", dto);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
});
