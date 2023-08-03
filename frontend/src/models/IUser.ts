import { IMedia } from "./IMedia";

export interface IUser {
  id: number;
  name: string;
  email: string;
  surname: string;
  club?: string;
  city: string;
  country: string;
  balance: number;
  token: string;
  isMember?: boolean;
  image?: IMedia;
  role?: string;
}

export interface ITransaction {
  id: number;
  amount: number;
  date: string;
  type: string;
  sender: IUser;
  receiver: IUser;
  txHash: string;
}
