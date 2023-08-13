import { IEvent } from "~/lib/events/types";

export type CreateViewer = {
  eventId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  discoveryMethod?: string;
};

export type IViewer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  discoveryMethod: string;
  event: IEvent;
};
