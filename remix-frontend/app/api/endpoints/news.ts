import { AxiosInstance } from "axios";
import { CreateNews } from "~/lib/news/types/CreateNewsDto";
import { INews, NewsPreview } from "~/lib/news/types/INews";

export const NewsApi = (instance: AxiosInstance) => ({
  getNews: () => instance.get<INews>("/news"),
  getNewsPreviews: () => instance.get<NewsPreview>("/news/previews"),
  getNewsById: (id?: string) => instance.get(`/news/${id}`),
  createNews: (data: CreateNews) => instance.post<INews>("/news", data),
});
