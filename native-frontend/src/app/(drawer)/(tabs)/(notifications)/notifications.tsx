import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import NotAuthTemplate from "@Components/common/NotAuthTemplate";
import NotificationItem from "@Components/notifications/NotificationItem";
import { Box, Divider, Heading, Pressable, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { INotification } from "@lib/models";
import { useGetReceivedNotificationsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { FlatList } from "react-native";

const Notifications = () => {
  const user = useAppSelector(selectUser);
  const {
    data: notificationsData,
    isLoading,
    error,
  } = useGetReceivedNotificationsQuery();

  const [notifications, setNotifications] = React.useState<INotification[]>();

  const readNotification = (id: number) => {
    setNotifications((prev) =>
      prev?.map((n) => {
        if (n.id === id) {
          return {
            ...n,
            status: "read",
          };
        }
        return n;
      })
    );
  };

  useEffect(() => {
    if (notificationsData?.length) {
      setNotifications(notificationsData);
    }
  }, [notificationsData]);

  if (!user) {
    return (
      <VStack my={"$6"} flex={1}>
        <NotAuthTemplate
          title="Notifications"
          text={"Login to see your notifications"}
        />
      </VStack>
    );
  }

  return (
    <VStack>
      <Box p={"$4"}>
        <Heading size={"lg"}>
          Notifications (
          {notifications?.filter((n) => n.status === "unread")?.length} unread)
        </Heading>
      </Box>
      <Box bgColor="$white">
        <WithLoading isLoading={isLoading}>
          {notifications &&
            (notifications.length > 0 ? (
              <FlatList
                data={notifications}
                ItemSeparatorComponent={() => (
                  <Divider bgColor="$coolGray300" height={"$0.5"} />
                )}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }: { item: INotification }) => (
                  <Link
                    href={`/(drawer)/(tabs)/(notifications)/${item.id}`}
                    asChild
                  >
                    <Pressable onPress={() => readNotification(item.id)}>
                      {({ pressed }: { pressed: boolean }) => (
                        <NotificationItem
                          notification={item}
                          pressed={pressed}
                        />
                      )}
                    </Pressable>
                  </Link>
                )}
              />
            ) : (
              <Box p={"$4"}>
                <Heading size={"md"}>No notifications yet</Heading>
              </Box>
            ))}
        </WithLoading>
      </Box>
    </VStack>
  );
};

export default withWatermarkBg(Notifications);
