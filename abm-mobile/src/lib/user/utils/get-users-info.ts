import { formatDate } from "@lib/common/utils";
import { TFunction } from "i18next";
import { IUser } from "../models";

export type InfoItem = {
  label: string;
  labelImage?: string;
  value: string;
};

export const getUsersInfo = (
  user: IUser,
  t: TFunction<"translation", undefined>
): InfoItem[] => {
  const infoArray: InfoItem[] = [];
  infoArray.push({
    label: t("userInfo.nationality"),
    labelImage: user.country?.flagIconUrl,
    value: user.country?.name || "",
  });

  if (user.runner) {
    infoArray.push({
      label: t("userInfo.gender"),
      value: user.runner.gender,
    });
    infoArray.push({
      label: t("userInfo.dateOfBirth"),
      value: formatDate(user.runner.dateOfBirth, false), // Ensure formatDate is defined
    });
    infoArray.push({
      label: t("userInfo.rank"),
      value: user.runner.rank < 1000 ? user.runner.rank.toString() : "-",
    });
  }

  return infoArray;
};
