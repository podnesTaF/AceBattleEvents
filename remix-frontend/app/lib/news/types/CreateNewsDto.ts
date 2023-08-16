import { IMedia } from "~/lib/media/types/IMedia";

export type CreateNews = {
  title: string;
  contents: {
    type: string;
    text?: string;
    media?: IMedia;
  }[];
  tags: string[];
};
