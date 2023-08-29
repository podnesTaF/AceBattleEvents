import { getCategoryByDoB } from "~/lib/utils";
import { IUser } from "../types/IUser";

export const isAbleToJoin = (user?: IUser) => {
  return user?.role === "runner" && !user.club?.id;
};

export const isAbleToInvite = (user?: IUser | null) => {
  return user?.role === "manager" && user?.clubId;
};

export const getPickItems = (users?: IUser[]) => {
  return (
    users?.map((item: IUser) => ({
      id: item.id,
      title: item.name + " " + item.surname,
      additionalInfo: getCategoryByDoB(item.dateOfBirth),
    })) || []
  );
};
