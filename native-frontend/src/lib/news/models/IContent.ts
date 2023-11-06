import { IMedia } from "@lib/models";

export type IContent = {
    id: number;
    type: string;
    text?: string;
    media?: IMedia;
  };