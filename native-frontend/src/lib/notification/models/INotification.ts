import { IUser } from "@lib/models";

export type INotification = {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  sender: IUser;
};
