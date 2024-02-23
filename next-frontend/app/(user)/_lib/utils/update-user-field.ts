import { Api } from "@/api/axiosInstance";
import { Session } from "next-auth";
import { IUser } from "../types";

export const updateUserField = async (
  session: Session,
  names: (keyof IUser)[],
  newValues: (string | number | null | File | boolean)[]
) => {
  if (names.includes("avatar" as any) || names.includes("image" as any)) {
    const formData = new FormData();

    names.forEach((name, index) => {
      const value = newValues[index];

      if (value instanceof File) {
        formData.append(name, value, value.name);
      }
    });

    await Api(session).users.updateMyProfileImage(formData);
    return;
  }

  const payload = names.reduce((acc, name, index) => {
    acc[name] = newValues[index];
    return acc;
  }, {} as Partial<IUser>);

  await Api(session).users.updateMyProfile(payload);
};
