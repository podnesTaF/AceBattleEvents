import { IContent, IUser } from "@lib/models";

export type INotification = {
  id: number;
  type: string;
  title: string;
  status: string;
  contents: IContent[];
  sender?: IUser;
  reveivers: IUser[];
  createdAt: string;
};
