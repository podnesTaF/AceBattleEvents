import { IMedia } from "@lib/models";

export type IFutureEvent = {
  id: number;
  title: string;
  season: string;
  date?: string;
  description?: string;
  introImage?: IMedia;
};

export type MappedFutureEvent = {
  id: number;
  title: string;
  season?: string;
  date?: string;
  introImage?: IMedia;
  infoAvailable?: boolean;
};
