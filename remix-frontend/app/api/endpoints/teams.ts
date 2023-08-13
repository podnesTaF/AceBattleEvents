import { AxiosInstance } from "axios";
import { ITeam } from "~/lib/teams/types";
import { ReqTeam } from "~/lib/teams/types/ITeam";
import { ITeamEvent } from "~/lib/teams/types/Registrations";

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
  async addTeam(data: ReqTeam) {
    try {
      const { data: teamsData } = await instance.post<ReqTeam>(`/teams`, data);

      return teamsData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },
  async getRegitrations({ page, limit }: { page: string; limit: string }) {
    try {
      const { data: registrations } = await instance.get<{
        teamsForEvents: ITeamEvent[];
        totalPages: number;
      }>(`/teams/registrations?page=${page}&limit=${limit}`);

      return registrations;
    } catch (error) {
      console.log(error);
    }
  },
  async getTeamByUserId() {
    try {
      const { data: team } = await instance.get<ITeam[]>(`/teams/user`);

      return team;
    } catch (error) {
      console.log(error);
    }
  },
});
