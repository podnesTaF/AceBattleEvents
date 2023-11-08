import { formatDate } from "@lib/common/utils";
import { IUser } from "../models";

export type InfoItem = {
  label: string;
  labelImage?: string;
  value: string;
};

export const getUsersInfo = (user: IUser): InfoItem[] => {
  const infoArray: InfoItem[] = [];
  infoArray.push({
    label: "Nationality",
    labelImage: user.country?.image?.flagIconUrl,
    value: user.country?.name || "",
  });

  if (user.runner) {
    infoArray.push({
      label: "Date of birth",
      value: formatDate(user.runner.dateOfBirth, false),
    });
    infoArray.push({
      label: "Gender",
      value: user.runner.gender,
    });
    infoArray.push({
      label: "Date of birth",
      value: formatDate(user.runner.dateOfBirth, false),
    });
    infoArray.push({
      label: "Rank",
      value: user.runner.rank < 1000 ? user.runner.rank + "" : "-",
    });
  }

  return infoArray;
};
