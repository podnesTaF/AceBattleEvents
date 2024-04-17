import { IMedia } from "@lib/models";


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
