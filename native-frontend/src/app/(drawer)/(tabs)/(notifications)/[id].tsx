import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import { notifications } from "@Constants/dummy-data";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  HStack,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ReplyIcon } from "lucide-react-native";
import React from "react";

const NotificationScreen = () => {
  const { id } = useLocalSearchParams();
  const notification = notifications.find((n) => n.id === Number(id));

  if (!notification) {
    return null;
  }

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
              <HStack space="md" width={"95%"} alignItems="center">
                <Avatar size="md">
                  <AvatarImage
                    source={{ uri: notification.sender.image?.mediaUrl }}
                    alt="avatar"
                    role={"img"}
                  />
                  <AvatarFallbackText>
                    {notification.sender.name[0]}
                    {notification.sender.surname[0]}
                  </AvatarFallbackText>
                </Avatar>
                <VStack flex={1}>
                  <Heading size={"sm"} color={props.tintColor}>
                    {notification.title}
                  </Heading>
                </VStack>
              </HStack>
            </VStack>
          ),
        }}
      />
      <Box py={"$4"} px={"$2"}>
        <Container vertical={true}>
          <Box py={"$4"}>
            <Text size={"md"}>{notification.text}</Text>
          </Box>
          <HStack py={"$4"} justifyContent={"space-between"}>
            <Text size={"sm"} color={"$coolGray300"}>
              {notification.createdAt}
            </Text>
            <Link href={`/(modals)/(reply)/${notification.id}`} asChild>
              <Pressable>
                {({ pressed }: { pressed: boolean }) => (
                  <Icon opacity={pressed ? 0.8 : 1} as={ReplyIcon} size="xl" />
                )}
              </Pressable>
            </Link>
          </HStack>
        </Container>
      </Box>
    </>
  );
};

export default withWatermarkBg(NotificationScreen);
