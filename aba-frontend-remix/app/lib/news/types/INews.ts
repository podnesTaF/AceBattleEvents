import { IEvent } from "~/lib/types";

export type INews = {
  id: number;
  title: string;
  previewImageUrl?: string;
  contents: IContent[];
  hashtags: Hashtag[];
  relatedArticles: {
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
  previewImageUrl?: string;
  createdAt: string;
  mainImageUrl?: string;
};

export type IContent = {
  id: number;
  type: string;
  text?: string;
  mediaUrl?: string;
  purpose?: string;
};

export type Hashtag = {
  id: number;
  name: string;
};
