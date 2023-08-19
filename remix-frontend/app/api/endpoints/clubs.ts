import { AxiosInstance } from "axios";
import { IClub, JoinRequest } from "~/lib/clubs/types";
import { IRace } from "~/lib/races/types";

export const ClubApi = (instance: AxiosInstance) => ({
  async getClubs(params?: string, currPage?: number) {
    const { data: clubsData } = await instance.get<IClub[]>("/clubs");

    if (!clubsData) {
      return null;
    } else {
      return clubsData;
    }
  },
  async getClub(id?: string) {
    if (!id) return null;
    const { data: clubData } = await instance.get<IClub>(`/clubs/${id}`);

    if (!clubData) {
      return null;
    } else {
      return clubData;
    }
  },
  async sendJoinRequest(motivation: string, clubId: number) {
    try {
      const { data: JoinRequest } = await instance.post<JoinRequest>(
        "/club-requests",
        {
          motivation,
          clubId,
        }
      );

      return JoinRequest;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
  async getJoinRequests(clubId: string) {
    try {
      const { data: JoinRequests } = await instance.get<JoinRequest[]>(
        `/club-requests/club/${clubId}`
      );

      return JoinRequests;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
  async acceptJoinRequest({
    clubId,
    userId,
  }: {
    clubId: string;
    userId: string;
  }) {
    try {
      const { data: response } = await instance.post<{ message: string }>(
        `/club-requests/club/${clubId}/accept`,
        {
          userId,
        }
      );

      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
  async rejectJoinRequest({
    clubId,
    userId,
  }: {
    clubId: string;
    userId: string;
  }) {
    try {
      const { data: response } = await instance.post<{ message: string }>(
        `/club-requests/club/${clubId}/decline`,
        { userId }
      );

      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
  async createClub(dto: {
    name: string;
    city: string;
    country: string;
    logo: any;
    phone: string;
    photo: any;
  }) {
    try {
      const { data: clubData } = await instance.post<IClub>("/clubs", dto);

      return clubData;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
  async findClubsSnippet() {
    try {
      const { data } = await instance.get<{ id: number; name: string }[]>(
        "/clubs/snippet"
      );
      return { clubs: data, error: null };
    } catch (e: any) {
      return {
        clubs: [],
        error: e.response.data.message,
      };
    }
  },
  async handleFavorites(clubId: number, action: string) {
    try {
      const { data } = await instance.post<{ message: string }>(
        `/clubs/${clubId}/handle-favorite`,
        { action }
      );

      return data;
    } catch (e: any) {
      throw new Error(e.response.data.message);
    }
  },
  async getClubFinishedRaces(clubId: number) {
    try {
      const { data: races } = await instance.get<IRace[]>(
        `/clubs/${clubId}/races`
      );

      return races;
    } catch (error) {
      console.log(error);
    }
  },
});
