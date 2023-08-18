import { IUser } from "../types/IUser";

export const isAbleToJoin = (user?: IUser) => {
  return user?.role === "runner" && !user.club?.id;
};

export const isAbleToInvite = (user?: IUser | null) => {
  return user?.role === "manager" && user?.clubId;
};
