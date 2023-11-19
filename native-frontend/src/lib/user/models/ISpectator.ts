import { IClub, IEvent, IMedia, IUser } from "@lib/models";

export interface ISpectator {
  id: number;
  favoriteClubs?: IClub;
  ageRange?: string;
  user: IUser;
}

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
