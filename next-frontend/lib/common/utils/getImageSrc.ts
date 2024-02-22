import { baseURL } from "@/api/axiosInstance";

export const getImageSrc = (
  imageName: string | undefined,
  topic: string,
  id?: number
) => {
  return `${baseURL}/${topic}/${id}/${imageName}`;
};
