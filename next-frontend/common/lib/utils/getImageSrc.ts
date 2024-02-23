import { baseURL } from "@/api/axiosInstance";

export const getImageSrc = (
  imageName: string | undefined,
  topic: string,
  id?: number
) => {
  return `${baseURL}/media/${topic}/${id}/${imageName}`;
};

export const getCountryFlagSrc = (shortName: string) => {
  return `https://flagcdn.com/${shortName.toLowerCase()}.svg`;
};