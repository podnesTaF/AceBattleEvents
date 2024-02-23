import { Api } from "@/api/axiosInstance";
import { Session } from "next-auth";
import { IUser } from "../types";

export const updateUserField = async (
  session: Session,
  names: (keyof IUser)[],
  newValues: (string | number | null | File)[]
) => {
  const formData = new FormData();

  names.forEach((name, index) => {
    const value = newValues[index];

    // Check if the value is a File object
    if (value instanceof File) {
      formData.append(name, value, value.name);
    } else if (value !== null) {
      formData.append(name, value.toString());
    } else {
      formData.append(name, "");
    }
  });

  await Api(session).users.updateMyProfile(formData);
};
