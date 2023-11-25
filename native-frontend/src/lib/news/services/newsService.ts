import { api } from "@lib/common/services/api";
import { INews, NewsPreview } from "../models";

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchNewsPreviews: builder.query<
      { newsPreviews: NewsPreview[]; totalPages: number },
      { limit?: number; textLength?: number; page?: number }
    >({
      query: ({ limit, textLength, page }) => ({
        url: `/news/previews?limit=${limit}&textLength=${textLength}&page=${page}`,
      }),
      providesTags: (result) => ["NewsPreview"],
    }),
    getArticle: builder.query<INews, string>({
      query: (id) => ({
        url: `/news/${id}`,
      }),
      providesTags: (result) => [{ type: "News", id: result?.id }],
    }),
  }),
});

export const { useFetchNewsPreviewsQuery, useGetArticleQuery } = newsApi;
