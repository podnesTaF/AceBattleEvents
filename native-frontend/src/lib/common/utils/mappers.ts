import { ICoach, IRunner } from "@lib/models";
import { PickItem } from "../types";
import { getCategoryByDoB } from "./date-utils";

export const mapRunnersToPickItems = (runners?: IRunner[]): PickItem[] => {
  return (
    runners?.map((item: IRunner) => ({
      id: item.id,
      title: item.user.name + " " + item.user.surname,
      additionalInfo: getCategoryByDoB(item.dateOfBirth),
      imageUrl: item.user.image?.mediaUrl,
    })) || []
  );
};

export const mapCoachesToPickItems = (coaches?: ICoach[]): PickItem[] => {
  return (
    coaches?.map((item: ICoach) => ({
      id: item.id,
      title: item.name + " " + item.surname,
      additionalInfo: "coach",
    })) || []
  );
};
