import { IUser, UserApi } from "@/src/entities/User";
import { Session } from "next-auth";

export const updateUserField = async (
  session: Session,
  names: (keyof IUser)[],
  newValues: (string | number | null | File | boolean)[]
) => {
  const userApi = new UserApi(session);
  if (names.includes("avatar" as any) || names.includes("image" as any)) {
    const formData = new FormData();

    names.forEach((name, index) => {
      const value = newValues[index];

      if (value instanceof File) {
        formData.append(name, value, value.name);
      }
    });
    await userApi.updateMyProfileImage(formData);
    return;
  }

  const payload = names.reduce((acc, name, index) => {
    acc[name] = newValues[index];
    return acc;
  }, {} as Partial<IUser>);

  await userApi.updateMyProfile(payload);
};
