import { IUser } from "~/lib/types";

export type IFeedback = {
  id: number;
  message: string;
  aboutCommentator?: string;
  user: IUser;
  createdAt: string;
  approved: boolean;
};
