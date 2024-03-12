import { baseURL } from "../../constants";

export const getImageSrc = (
  imageName: string | undefined,
  topic: string,
  id?: number
) => {
  return `${baseURL}/media/${topic}/${id}/${imageName}`;
};

export const getCountryFlagSrc = (shortName?: string) => {
  if (!shortName) return "";
  return `https://flagcdn.com/${shortName.toLowerCase()}.svg`;
};
