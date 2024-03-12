import { Api } from "@/src/shared/api";
import { ITeam } from "../../Teams";
import { IUser } from "../../User";

export class AthleteApi extends Api {
  async getAthlete(id: string) {
    const { data } = await this.instance.get<IUser>("/runners/" + id);
    return data;
  }
  async getAthleteTeams(id: string) {
    const { data } = await this.instance.get<{
      active: ITeam[];
      past: ITeam[];
    }>("/team-players/runner/" + id);
    return data;
  }
}
