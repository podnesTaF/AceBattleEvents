import { useAppDispatch } from "@lib/common/hooks/useAppDispatch";
import { api } from "@lib/services";
import { removeUser, setLoading } from "@lib/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    dispatch(setLoading(true));
    try {
      await AsyncStorage.removeItem("userToken");
      dispatch(removeUser());

      dispatch(api.util.resetApiState());
    } catch (e: any) {
      dispatch(setLoading("Error loggining out user "));
      console.log(e);
    }
    setIsLoading(false);
    dispatch(setLoading(false));
    router.replace("/(drawer)/(tabs)/home");
  };

  return [logout, isLoading] as const;
};
