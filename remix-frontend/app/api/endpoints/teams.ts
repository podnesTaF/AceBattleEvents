import { AxiosInstance } from "axios";
import { ITeam } from "~/lib/teams/types";

export const TeamsApi = (instance: AxiosInstance) => ({
  async getTeams({ params, page }: { params?: string; page?: number }) {
    try {
      const { data: teamsData } = await instance.get<{
        teams: ITeam[];
        totalPages: number;
      }>(`teams?${params}&page=${page}`);

      return teamsData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },

  async getTeamsByUserId() {
    try {
      const { data: teamsData } = await instance.get<ITeam[]>(`teams/user`);

      return teamsData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },

  async registerTeam(props: {
    teamId: number;
    eventId: number;
    txHash: string;
    wallet: string;
  }) {
    try {
      const { data: teamsData } = await instance.post<ITeam[]>(
        `/teams/register`,
        props
      );

      return teamsData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },
});
