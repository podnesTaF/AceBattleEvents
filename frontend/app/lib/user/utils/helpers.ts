import { getCategoryByDoB } from "~/lib/utils";
import { IRunner } from "../types";
import { IUser } from "../types/IUser";

export const isAbleToJoin = (user?: IUser) => {
  return user?.role === "runner" && !user.club?.id;
};

export const isAbleToInvite = (user?: IUser | null) => {
  return user?.role === "manager" && user?.clubId;
};

export const getPickItems = (runners?: IRunner[]) => {
  return (
    runners?.map((item: IRunner) => ({
      id: item.id,
      title: item.user.name + " " + item.user.surname,
      additionalInfo: getCategoryByDoB(item.dateOfBirth),
    })) || []
  );
};
