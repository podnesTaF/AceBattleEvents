import { api } from "@lib/common/services/api";
import { IMedia } from "../models";

export const MediaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<IMedia, any>({
      query: (file) => {
        const formData = new FormData();
        formData.append("image", file);

        return {
          url: "/images",
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = MediaApi;
