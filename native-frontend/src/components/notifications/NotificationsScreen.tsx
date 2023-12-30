import AbmButton from "@Components/common/buttons/AbmButton";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import Badge from "@Components/custom/Badge";
import UserCardSkeleton from "@Components/user/UserCardSkeleton";
import { Box, Divider, HStack, Heading, VStack } from "@gluestack-ui/themed";
import { useAppDispatch, useAppSelector, useScreenSize } from "@lib/hooks";
import { INotification } from "@lib/models";
import {
  decrementUnreadCount,
  selectUnreadCount,
} from "@lib/notification/slices";
import { useGetReceivedNotificationsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { getNotificationFilters } from "@lib/utils";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import NotificationItem from "./NotificationItem";

const NotificationsScreen = () => {
  const user = useAppSelector(selectUser);
  const {
    data: notificationsData,
    isLoading,
    error,
  } = useGetReceivedNotificationsQuery();
  const dispatch = useAppDispatch();
  const unreadNotifications = useAppSelector(selectUnreadCount);

  const [notifications, setNotifications] = React.useState<INotification[]>();
  const [unreadIds, setUnreadIds] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const { isSmallScreen } = useScreenSize();

  const readNotification = (notification: INotification) => {
    if (unreadIds.includes(notification.id)) {
      dispatch(decrementUnreadCount());
      setUnreadIds((prev) => prev.filter((n) => n !== notification.id));
    }
  };

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData);
      setUnreadIds(
        notificationsData.filter((n) => n.status === "unread").map((n) => n.id)
      );
    }
  }, [notificationsData]);

  useEffect(() => {
    if (notificationsData?.length) {
      if (activeFilter === "All") {
        setNotifications(notificationsData);
      } else if (activeFilter === "Team") {
        setNotifications(notificationsData.filter((n) => n.type === "team"));
      } else if (activeFilter === "Manager") {
        setNotifications(notificationsData.filter((n) => n.type === "manager"));
      }
    }
  }, [activeFilter]);

  const loadingComponent = () => (
    <VStack space={"md"}>
      {[...Array(3)].map((_, i) => (
        <UserCardSkeleton key={i} height={70} />
      ))}
    </VStack>
  );
  return (
    <VStack>
      <HStack
        flexDirection={isSmallScreen ? "column" : "row"}
        gap={"$3"}
        justifyContent="space-between"
        alignItems={isSmallScreen ? "flex-start" : "center"}
        p={"$4"}
      >
        <Box>
          <Heading size={"md"}>
            Notifications ({unreadNotifications + " unread"})
          </Heading>
          <HStack mt={"$2"} space="md">
            {getNotificationFilters(user?.role).map((filter, i) => (
              <Badge
                px={"$3"}
                py={"$1"}
                key={i}
                text={filter}
                isActive={filter === activeFilter}
                onPress={() => setActiveFilter(filter)}
              />
            ))}
          </HStack>
        </Box>
        {user?.role === "manager" && (
          <AbmButton
            title="Send Notification"
            size="sm"
            onPress={() => router.push("/send-notification")}
          />
        )}
      </HStack>
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
                    <Pressable onPress={() => readNotification(item)}>
                      {({ pressed }: { pressed: boolean }) => (
                        <NotificationItem
                          notification={item}
                          pressed={pressed}
                          isRead={!unreadIds.includes(item.id)}
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
