import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import UserCardSkeleton from "@Components/user/UserCardSkeleton";
import { Box, Divider, Heading, VStack } from "@gluestack-ui/themed";
import { INotification } from "@lib/models";
import { useGetUserSentNotificationsQuery } from "@lib/services";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Pressable } from "react-native";
import NotificationItem from "./NotificationItem";

const SentNotifications = () => {
  const {
    data: notifications,
    isLoading,
    error,
  } = useGetUserSentNotificationsQuery();

  const loadingComponent = () => (
    <VStack space={"md"}>
      {[...Array(3)].map((_, i) => (
        <UserCardSkeleton key={i} height={70} />
      ))}
    </VStack>
  );

  return (
    <VStack my={"$4"}>
      <Heading mx={"$4"} mb={"$4"} size={"md"}>
        Sent Notifications
      </Heading>
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
                    <Pressable>
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
                <Heading size={"md"}>No notifications sent yet</Heading>
              </Box>
            )
          }
        </SkeletonLoader>
      </Box>
    </VStack>
  );
};

export default SentNotifications;
