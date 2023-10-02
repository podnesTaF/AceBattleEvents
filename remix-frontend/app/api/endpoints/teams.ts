import { AxiosInstance } from "axios";
import { ITeam } from "~/lib/teams/types";
import { ReqTeam, TeamResult } from "~/lib/teams/types/ITeam";
import { ITeamEvent } from "~/lib/teams/types/Registrations";
import { IMedia } from "~/lib/types";

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

  async getTeamsSnippetsByEventId(
    id?: number
  ): Promise<{ id: number; name: string }[] | undefined> {
    try {
      if (!id) return [];
      const { data } = await instance.get<{ id: number; name: string }[]>(
        `teams/snippet/${id}`
      );
      return data;
    } catch (error: any) {
      return error.message;
    }
  },

  async getPreviewTeams() {
    try {
      const { data: teamsData } = await instance.get<
        { id: number; logo: IMedia; name: string }[]
      >(`teams/previews`);

      return teamsData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },

  async findMyTeams() {
    try {
      const { data: teamsData } = await instance.get<ITeam[]>(`teams/my`);

      return teamsData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },
  async getTeamById(id?: string) {
    try {
      const { data: teamsData } = await instance.get<ITeam>(`teams/${id}`);

      return teamsData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },

  async getTeamsByUserId(id?: string) {
    try {
      const { data: teamsData } = await instance.get<ITeam[]>(
        `teams/user/${id}`
      );

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
  async getTeamsByRunner(id?: string) {
    try {
      const { data: teams } = await instance.get<ITeam[]>(
        `/teams/runner/${id}`
      );

      return teams;
    } catch (error) {
      console.log(error);
    }
  },
  async getTeamByCurrentUserId() {
    try {
      const { data: team } = await instance.get<ITeam[]>(`/teams/my`);

      return team;
    } catch (error) {
      console.log(error);
    }
  },
  async getTeamResultsByClubId({
    id,
    page,
    limit,
    year,
    category,
  }: {
    id: number;
    page: number;
    limit?: number;
    year?: string;
    category?: string;
  }) {
    try {
      const { data: results } = await instance.get<{
        results: TeamResult[];
        totalPages: number;
      }>(
        `/team-results/club/${id}?page=${page}&limit=${limit || 2}&year=${
          year || ""
        }&category=${category || ""}`
      );

      return results;
    } catch (error) {
      console.log(error);
    }
  },

  async getTeamResultsByTeamId(id: number) {
    try {
      const { data: results } = await instance.get<{
        results: TeamResult[];
        totalPages: number;
      }>(`/team-results/team/${id}`);

      return results;
    } catch (error) {
      console.log(error);
    }
  },

  async getPersonalCalendar() {
    try {
      const { data: calendar } = await instance.get<ITeamEvent[]>(
        `/teams/user-registrations`
      );
      return calendar;
    } catch (error) {
      console.log(error);
    }
  },

  async CountAll() {
    try {
      const { data } = await instance.get<any[]>("/teams/count/all");

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async updateTeamResult(
    id: number,
    data: { resultInMs?: number; teamId?: number; oldTeamId?: number }
  ) {
    try {
      const { data: result } = await instance.patch<TeamResult>(
        `/team-results/${id}`,
        data
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  },

  async updateTeam(
    id: number,
    data: {
      name: string;
      city: string;
      gender: string;
      coach: {
        name: string;
        surname: string;
      };
      players: number[];
    }
  ) {
    try {
      const { data: team } = await instance.patch<ITeam>(`/teams/${id}`, data);

      return team;
    } catch (error) {
      return null;
    }
  },
});
