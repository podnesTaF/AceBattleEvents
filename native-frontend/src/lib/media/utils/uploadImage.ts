import { BASE_URL } from "@lib/services";
import axios from "axios";
import mime from "mime";

export const uploadImage = async (fileUri: string) => {
  const formData = new FormData();

  formData.append("image", {
    uri: fileUri,
    type: mime.getType(fileUri),
    name: fileUri.split("/").pop(),
  } as any);

  const { data } = await axios.post(BASE_URL + "/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
