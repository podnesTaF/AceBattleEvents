import { AxiosInstance } from "axios";
import { IClub, JoinRequest } from "~/lib/clubs/types";
import { IRace } from "~/lib/races/types";
import { IMedia } from "~/lib/types";

export const ClubApi = (instance: AxiosInstance) => ({
  async getClubs(params?: string, currPage?: number) {
    const { data: clubsData } = await instance.get<{
      clubs: IClub[];
      totalPages: number;
    }>("/clubs?" + params);

    if (!clubsData) {
      return null;
    } else {
      return clubsData;
    }
  },
  async getPreviewClubs() {
    const { data: clubsData } = await instance.get<IClub[]>("/clubs/preview");

    if (!clubsData) {
      return [];
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
  async getJoinRequests(clubId: string, queries: string) {
    try {
      const { data } = await instance.get<{
        totalCount: number;
        joinRequests: JoinRequest[];
      }>(`/club-requests/club/${clubId}?${queries}&limit=5`);

      return data;
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
  async handleUpdateClubData(
    id: number,
    data: {
      name?: string;
      city?: string;
      country?: string;
      logo?: IMedia;
      image?: IMedia;
    }
  ) {
    try {
      const { data: club } = await instance.patch<IClub>(
        `/clubs/${id}/club-data`,
        data
      );
      return club;
    } catch (error: any) {
      throw new Error("Failed to update user: " + error.message);
    }
  },
  async kickMembers(clubId: number, userIds: number[]) {
    try {
      const { data } = await instance.patch<IClub>(
        `/clubs/${clubId}/kick-members`,
        { userIds }
      );
      return data;
    } catch (error) {}
  },

  async leaveClub(id: number) {
    try {
      const { data: club } = await instance.post<IClub>(`/clubs/${id}/leave`);
      return club;
    } catch (error: any) {
      throw new Error("Failed to leave club: " + error.message);
    }
  },
});
