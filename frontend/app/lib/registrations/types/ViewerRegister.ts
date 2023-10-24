import { IEvent } from "~/lib/events/types";
import { IMedia, IUser } from "~/lib/types";

export type CreateViewer = {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
};

export type IViewer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  discoveryMethod: string;
  event: IEvent;
  viewer: IUser;
  qrcode: IMedia;
  ticket: IMedia;
};
