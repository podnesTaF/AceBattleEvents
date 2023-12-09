import { api } from "@lib/common/services/api";
import { IHashtag, INews, NewsPreview } from "../models";

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchNewsPreviews: builder.query<
      { newsPreviews: NewsPreview[]; totalPages: number },
      { limit?: number; textLength?: number; page?: number; tags?: string[] }
    >({
      query: ({ limit, textLength, page, tags }) => ({
        url: `/news/previews?limit=${limit || ""}&textLength=${
          textLength || ""
        }&page=${page || 1}&tags=${tags?.join(",") || ""}`,
      }),
    }),
    getArticle: builder.query<INews, string>({
      query: (id) => ({
        url: `/news/${id}`,
      }),
      providesTags: (result) => [{ type: "News", id: result?.id }],
    }),
    fetchTags: builder.query<IHashtag[], void>({
      query: () => ({
        url: "/hashtags",
      }),
      providesTags: (result) => ["Tags"],
    }),
  }),
});

export const {
  useFetchNewsPreviewsQuery,
  useGetArticleQuery,
  useFetchTagsQuery,
} = newsApi;
