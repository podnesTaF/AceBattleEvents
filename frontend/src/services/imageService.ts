import { api } from "./api";

export const imageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSmallImages: builder.query<{ imagePaths: string[] }, void>({
      query: () => `/images/small`,
    }),
  }),
});

export const { useGetSmallImagesQuery } = imageApi;
