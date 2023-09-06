import { AxiosInstance } from "axios";
import { CreateNews } from "~/lib/news/types/CreateNewsDto";
import { INews, NewsPreview } from "~/lib/news/types/INews";

export const NewsApi = (instance: AxiosInstance) => ({
  getNews: () => instance.get<INews>("/news"),
  getNewsPreviews: async (itemsAmount?: number) => {
    const { data } = await instance.get<NewsPreview[]>(
      "/news/previews?itemsAmount=" + itemsAmount
    );
    return data;
  },
  getNewsById: async (id?: string) => {
    const { data } = await instance.get<INews>(`/news/${id}`);
    return data;
  },
  createNews: (data: CreateNews) => instance.post<INews>("/news", data),
});
