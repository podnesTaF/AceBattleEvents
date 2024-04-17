import { IContent } from "@lib/models";

export type CreateNotificationDto = {
  title: string;
  contents: Partial<IContent>[];
  receivers?: number[];
  type: string;
};
