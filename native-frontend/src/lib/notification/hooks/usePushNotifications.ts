import { useAppDispatch } from "@lib/common/hooks/useAppDispatch";
import { api, useRegisterPushTokenMutation } from "@lib/services";
import { selectUser } from "@lib/store";
import { useAppSelector } from "@lib/user/hooks/useAppSelector";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { incrementUnreadCount } from "../slices";

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [registerPushToken] = useRegisterPushTokenMutation();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  useEffect(() => {
    const updateTokenIfDifferent = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token);
        const data = token?.data;
        if (data && data !== user?.expoPushToken) {
          const deviceIdentifier = `${Device.osName}-${Device.osVersion}`;
          await registerPushToken({
            token: data,
            deviceIdentifier: deviceIdentifier,
          });
        }
      } catch (error) {
        console.error("Error updating push token:", error);
      }
    };

    updateTokenIfDifferent();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        dispatch(incrementUnreadCount());
        dispatch(api.util.invalidateTags(["Notification"]));
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        dispatch(incrementUnreadCount());
        dispatch(api.util.invalidateTags(["Notification"]));
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current as Notifications.Subscription
      );
      Notifications.removeNotificationSubscription(
        responseListener.current as Notifications.Subscription
      );
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
