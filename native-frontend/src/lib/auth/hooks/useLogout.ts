import { useAppDispatch } from "@lib/common/hooks/useAppDispatch";
import { api } from "@lib/services";
import { removeUser } from "@lib/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");

      dispatch(api.util.resetApiState());
    } catch (e: any) {
      console.log(e);
    }
    dispatch(removeUser());
    router.replace("/(drawer)/(tabs)/home");
  };

  return logout;
};
