import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import UserCardSkeleton from "@Components/user/UserCardSkeleton";
import { Box, Divider, Heading, VStack } from "@gluestack-ui/themed";
import { INotification } from "@lib/models";
import { useGetReceivedNotificationsQuery } from "@lib/services";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Pressable } from "react-native";
import NotificationItem from "./NotificationItem";

const NotificationsScreen = () => {
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

  const loadingComponent = () => (
    <VStack space={"md"}>
      {[...Array(3)].map((_, i) => (
        <UserCardSkeleton key={i} height={70} />
      ))}
    </VStack>
  );

  return (
    <VStack>
      <Box p={"$4"}>
        <Heading size={"lg"}>
          Notifications (
          {notifications?.filter((n) => n.status === "unread")?.length} unread)
        </Heading>
      </Box>
      <Box bgColor="$white">
        <SkeletonLoader<INotification[]>
          data={notifications}
          error={error}
          isLoading={isLoading}
          loadingComponent={loadingComponent()}
        >
          {(data) =>
            data.length > 0 ? (
              <FlatList
                data={data}
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
            )
          }
        </SkeletonLoader>
      </Box>
    </VStack>
  );
};

export default NotificationsScreen;
