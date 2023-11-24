import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import NotAuthTemplate from "@Components/common/NotAuthTemplate";
import NotificationItem from "@Components/notifications/NotificationItem";
import { Box, Divider, Heading, Pressable, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { INotification } from "@lib/models";
import { useGetReceivedNotificationsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { Link } from "expo-router";
import React from "react";
import { FlatList } from "react-native";

const Notifications = () => {
  const user = useAppSelector(selectUser);
  const {
    data: notifications,
    isLoading,
    error,
  } = useGetReceivedNotificationsQuery();

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
        <Heading size={"lg"}>Notifications</Heading>
      </Box>
      <Container vertical={true}>
        <WithLoading isLoading={isLoading}>
          {notifications &&
            (notifications.length > 0 ? (
              <FlatList
                data={notifications}
                ItemSeparatorComponent={() => (
                  <Divider bgColor="$coolGray300" />
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
                <Heading size={"md"}>No notifications yet</Heading>
              </Box>
            ))}
        </WithLoading>
      </Container>
    </VStack>
  );
};

export default withWatermarkBg(Notifications);
