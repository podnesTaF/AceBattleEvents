import { AxiosInstance } from "axios";
import { IRaceRunner } from "~/lib/races/types/runnerResults";

export const ResultsApi = (instance: AxiosInstance) => ({
  async getBestMilerForEvent(eventCode: string) {
    try {
      const { data } = await instance.get<{ [gender: string]: IRaceRunner }>(
        `/race-runners/event-best-milers/${eventCode}`
      );

      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
});
