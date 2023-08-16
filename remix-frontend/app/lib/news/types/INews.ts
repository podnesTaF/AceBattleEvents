import { IMedia } from "~/lib/media/types/IMedia";

export type INews = {
  id: number;
  title: string;
  contents: IContent[];
  hashtags: Hashtag[];
};

export type NewsPreview = {
  id: number;
  title: string;
  previewText?: string;
  smallImageUrl?: string;
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
