import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { useAppDispatch, usePushNotifications } from "@lib/hooks";
import { setUnreadCount } from "@lib/notification/slices";
import {
  useFetchUserInitialDataQuery,
  useGetUnreadNotificationsCountQuery,
} from "@lib/services";
import { removeUser, setLoading, setUser, store } from "@lib/store";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "intl-pluralrules";
import { useEffect } from "react";
import { Provider } from "react-redux";
import "../../i18n";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const {
    data: user,
    isLoading,
    error: errorUser,
  } = useFetchUserInitialDataQuery();
  const {
    data: unreadCount,
    isLoading: isNotificationLoading,
    error: countError,
  } = useGetUnreadNotificationsCountQuery();
  const dispatch = useAppDispatch();
  const { expoPushToken } = usePushNotifications();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    } else if (isLoading) {
      dispatch(setLoading(true));
    } else if (errorUser) {
      dispatch(removeUser());
    }
  }, [user, isLoading, errorUser, dispatch]);

  useEffect(() => {
    if (unreadCount && user) {
      dispatch(setUnreadCount(unreadCount));
    }
  }, [unreadCount, user, isNotificationLoading, countError]);

  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </GluestackUIProvider>
  );
}
