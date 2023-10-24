import { IMedia } from "~/lib/media/types/IMedia";
import { Hashtag, IContent } from "./INews";

export type CreateNews = {
  title: string;
  contents: {
    type: string;
    text?: string;
    media?: IMedia;
  }[];
  hashtags: string[];
  mainImage: IMedia;
};

export type UpdateNews = {
  title?: string;
  contents: IContent[];
  hashtags: Hashtag[];
  mainImage?: IMedia;
};
