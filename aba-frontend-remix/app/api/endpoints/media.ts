import { AxiosInstance } from "axios";
import { IMedia } from "~/lib/types";

export const MediaApi = (instance: AxiosInstance) => ({
  async getAllMedia() {
    try {
      const { data: mediaData } = await instance.get(`/media/images`);
      return mediaData;
    } catch (error: any) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  },
  async addMedia(data: FormData) {
    try {
      const { data: mediaData } = await instance.post<IMedia>(`/images`, data);
      return mediaData;
    } catch (error: any) {
      throw new Error("Failed to add media: " + error.message);
    }
  },
});
