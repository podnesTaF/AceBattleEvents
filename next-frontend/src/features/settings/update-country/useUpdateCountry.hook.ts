import { useGetCountryNamesQuery } from "@/src/entities/Country";
import { IUser, UserApi } from "@/src/entities/User";
import { useSession } from "next-auth/react";

export const useUpdateCountry = () => {
  const { data: countries, isLoading, error } = useGetCountryNamesQuery();
  const { data: session } = useSession();

  const onSave = async (names: (keyof IUser)[], values: string[]) => {
    const userApi = new UserApi(session);
    const payload = {
      [names[0]]: values[0],
    };

    await userApi.updateMyProfile(payload);
  };

  return {
    countries,
    isLoading,
    error,
    onSave,
  };
};
