import { AxiosInstance } from "axios";
import { CreateNews, UpdateNews } from "~/lib/news/types/CreateNewsDto";
import { INews, NewsPreview } from "~/lib/news/types/INews";

export const NewsApi = (instance: AxiosInstance) => ({
  getNews: () => instance.get<INews>("/news"),
  getNewsPreviews: async ({
    itemsAmount,
    page,
    textLength,
  }: {
    itemsAmount?: number;
    textLength?: number;
    page?: number;
  }) => {
    const { data } = await instance.get<{
      newsPreviews: NewsPreview[];
      totalPages: number;
    }>(
      "/news/previews?limit=" +
        itemsAmount +
        "&textLength=" +
        textLength +
        "&page=" +
        page
    );
    return data;
  },
  getNewsById: async (id?: string) => {
    const { data } = await instance.get<INews>(`/news/${id}`);
    return data;
  },
  createNews: async (data: CreateNews) => {
    try {
      const { data: news } = await instance.post<INews>("/news", data);
      return news;
    } catch (error) {
      console.log("error creating news");
    }
  },
  updateNews: async (id: number, data: UpdateNews) => {
    try {
      const { data: news } = await instance.patch<INews>(`/news/${id}`, data);
      return data;
    } catch (error) {
      console.log("error updating news");
    }
  },
  deleteNews: async (id: number) => {
    try {
      const { data } = await instance.delete(`/news/${id}`);
      return data;
    } catch (error) {
      console.log("error deleting news");
    }
  },
});
