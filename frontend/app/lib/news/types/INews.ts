import { IMedia } from "~/lib/media/types/IMedia";
import { IEvent } from "~/lib/types";

export type INews = {
  id: number;
  title: string;
  mainImage?: IMedia;
  contents: IContent[];
  hashtags: Hashtag[];
  relatedNews: {
    newsPreviews: NewsPreview[];
    totalPages: number;
  };
  relatedEvents?: IEvent[];
  createdAt: string;
};

export type NewsPreview = {
  id: number;
  title: string;
  previewText?: string;
  smallImageUrl?: string;
  createdAt: string;
  mainImage?: IMedia;
};

export type IContent = {
  id: number;
  type: string;
  text?: string;
  media?: IMedia;
};

export type Hashtag = {
  id: number;
  name: string;
};
