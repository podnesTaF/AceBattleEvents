import { Api } from "@/api/axiosInstance";
import { Session } from "next-auth";
import { IUser } from "../types";

export const updateUserField = async (
  session: Session,
  names: (keyof IUser)[],
  newValues: (string | number | null)[]
) => {
  const payload = names.reduce((acc, name, index) => {
    acc[name] = newValues[index];
    return acc;
  }, {} as Partial<IUser>);

  await Api(session).users.updateMyProfile(payload);
};
