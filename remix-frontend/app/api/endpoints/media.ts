import { AxiosInstance } from "axios";

export const MediaApi = (instance: AxiosInstance) => ({
  async getAllMedia() {
    try {
      const { data: mediaData } = await instance.get(`/media/images`);
      return mediaData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },
});
