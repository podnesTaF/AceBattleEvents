import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import NotificationItem from "@Components/notifications/NotificationItem";
import { notifications } from "@Constants/dummy-data";
import { Box, Divider, Heading, Pressable, VStack } from "@gluestack-ui/themed";
import { INotification } from "@lib/models";
import { Link } from "expo-router";
import React from "react";
import { FlatList } from "react-native";

const Notifications = () => {
  return (
    <VStack>
      <Box p={"$4"}>
        <Heading size={"lg"}>Notifications</Heading>
      </Box>
      <Container vertical={true}>
        <FlatList
          data={notifications}
          ItemSeparatorComponent={() => <Divider bgColor="$coolGray300" />}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: INotification }) => (
            <Link href={`/(drawer)/(tabs)/(notifications)/${item.id}`} asChild>
              <Pressable>
                {({ pressed }: { pressed: boolean }) => (
                  <NotificationItem notification={item} pressed={pressed} />
                )}
              </Pressable>
            </Link>
          )}
        />
      </Container>
    </VStack>
  );
};

export default withWatermarkBg(Notifications);
