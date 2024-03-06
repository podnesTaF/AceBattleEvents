import { IUser } from "@/app/(user)/_lib/types";
import { AxiosInstance } from "axios";
import { ITeam } from "../../teams/types";

export const AthleteApi = (instance: AxiosInstance) => ({
  async getAthlete(id: string) {
    const { data } = await instance.get<IUser>("/runners/" + id);
    return data;
  },
  async getAthleteTeams(id: string) {
    const { data } = await instance.get<{ active: ITeam[]; past: ITeam[] }>(
      "/team-players/runner/" + id
    );
    return data;
  },
});
