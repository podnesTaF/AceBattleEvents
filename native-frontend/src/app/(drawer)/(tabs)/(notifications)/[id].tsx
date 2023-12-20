import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import { logoWhite } from "@Constants/cloud-images";
import {
  Avatar,
  AvatarImage,
  Box,
  HStack,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useGetNotificationQuery } from "@lib/services";
import { getTimeAgo } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const NotificationScreen = () => {
  const { id } = useLocalSearchParams();

  const { data: notification, isLoading, error } = useGetNotificationQuery(+id);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          presentation: "modal",
          headerTitle: (props) => (
            <VStack
              alignItems="center"
              width={"100%"}
              space="md"
              top={"$4"}
              pb={"$6"}
              left={"-$16"}
            >
              <Heading size="sm" color={"$coolGray400"}>
                Notification
              </Heading>
              <WithLoading isLoading={isLoading}>
                {notification && (
                  <HStack space="md" width={"95%"} alignItems="center">
                    <Avatar size="md" bg={"transparent"}>
                      <AvatarImage
                        source={{
                          uri:
                            notification?.sender?.image?.mediaUrl || logoWhite,
                        }}
                        alt="avatar"
                        role={"img"}
                      />
                    </Avatar>
                    <VStack flex={1}>
                      <Heading size={"sm"} color={props.tintColor}>
                        {notification.title}
                      </Heading>
                    </VStack>
                  </HStack>
                )}
              </WithLoading>
            </VStack>
          ),
        }}
      />
      <Box py={"$4"} px={"$2"}>
        <Container vertical={true}>
          <WithLoading isLoading={isLoading}>
            {notification && (
              <>
                {notification?.contents?.map((content, index) => (
                  <Box key={content.id} py={"$4"}>
                    <Text size={"md"}>{content?.text}</Text>
                  </Box>
                ))}
                <HStack py={"$4"} justifyContent={"space-between"}>
                  <Text size={"sm"} color={"$coolGray300"}>
                    {getTimeAgo(notification.createdAt)}
                  </Text>
                </HStack>
              </>
            )}
          </WithLoading>
        </Container>
      </Box>
    </>
  );
};

export default withWatermarkBg(NotificationScreen);
