import { IMedia } from "~/lib/media/types/IMedia";

export type INews = {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  media: IMedia;
};
