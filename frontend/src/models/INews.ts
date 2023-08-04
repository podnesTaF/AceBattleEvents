import { IMedia } from "./IMedia";

export type INews = {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  media: IMedia;
};
