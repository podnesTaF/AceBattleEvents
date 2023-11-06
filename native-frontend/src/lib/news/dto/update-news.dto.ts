import { IContent, IHashtag } from "@lib/models";

export type UpdateNews = {
    title?: string;
    contents: IContent[];
    hashtags: IHashtag[];
    mainImage?: IMedia;
  };