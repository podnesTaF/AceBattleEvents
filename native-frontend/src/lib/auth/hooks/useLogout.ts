import { useAppDispatch } from "@lib/common/hooks/useAppDispatch";
import { api } from "@lib/services";
import { removeUser } from "@lib/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("userToken");

      dispatch(api.util.resetApiState());
    } catch (e: any) {
      console.log(e);
    }
    dispatch(removeUser());
    setIsLoading(false);
    router.replace("/(drawer)/(tabs)/home");
  };

  return [logout, isLoading] as const;
};
