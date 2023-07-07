import { IMedia } from "@/models/IMedia";
import { api } from "./api";

export const imageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getImages: builder.query<IMedia[], void>({
      query: () => `/media/images`,
      providesTags: (result) => ["Image"],
    }),
  }),
});

export const { useGetImagesQuery } = imageApi;
