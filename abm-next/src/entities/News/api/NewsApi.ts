import { createApiInstance } from "@/src/shared/api";
import { Session } from "next-auth";
import { INews, INewsPreview } from "../model";

export class NewsApi {
  private instance;

  constructor(session?: Session | null) {
    this.instance = createApiInstance(session);
  }

  async getNewsPreviews({
    itemsAmount,
    page,
    textLength,
  }: {
    itemsAmount?: number;
    textLength?: number;
    page?: number;
  }) {
    const { data } = await this.instance.get<{
      newsPreviews: INewsPreview[];
      totalPages: number;
    }>(
      "/articles/previews?limit=" +
        itemsAmount +
        "&textLength=" +
        textLength +
        "&page=" +
        page
    );
    return data;
  }

  async getNewsById(id?: string) {
    const { data } = await this.instance.get<INews>(`/articles/${id}`);
    return data;
  }
}
