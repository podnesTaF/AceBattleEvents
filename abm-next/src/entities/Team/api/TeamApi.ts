import { createApiInstance } from "@/src/shared/api";
import { Session } from "next-auth";

export class TeamApi {
  private instance;

  constructor(session?: Session | null) {
    this.instance = createApiInstance(session);
  }

  async getPreviewTeams() {
    try {
      const { data: teamsData } = await this.instance.get<
        { id: number; logoUrl?: string; name: string }[]
      >(`teams/previews`);

      return teamsData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  }
}
