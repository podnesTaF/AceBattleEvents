import axios, { AxiosInstance } from "axios";
import { IClub } from "~/lib/clubs/types";

export const ClubApi = (instance: AxiosInstance) => ({
  async getClubs(params?: string, currPage?: number) {
    const { data: clubsData } = await axios.get<IClub[]>(
      "http://localhost:4000/api/v1/clubs"
    );

    if (!clubsData) {
      return null;
    } else {
      return clubsData;
    }
  },
  async getClub(id?: number) {
    if (!id) return null;
    const { data: clubData } = await axios.get<IClub>(
      `http://localhost:4000/api/v1/clubs/${id}`
    );

    if (!clubData) {
      return null;
    } else {
      return clubData;
    }
  },
});
