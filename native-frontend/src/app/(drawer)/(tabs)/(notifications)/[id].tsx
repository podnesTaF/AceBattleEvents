import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import {
  Avatar,
  AvatarImage,
  Box,
  HStack,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useGetNotificationQuery } from "@lib/services";
import { getTimeAgo } from "@lib/utils";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ReplyIcon } from "lucide-react-native";
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
                            notification?.sender?.image?.mediaUrl ||
                            "https://storage.googleapis.com/abe_cloud_storage/image/large/55c30c67-37aa-4476-bae9-b6f847a707fd.png",
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
                  <Link href={`/(modals)/(reply)/${notification.id}`} asChild>
                    <Pressable>
                      {({ pressed }: { pressed: boolean }) => (
                        <Icon
                          opacity={pressed ? 0.8 : 1}
                          as={ReplyIcon}
                          size="xl"
                        />
                      )}
                    </Pressable>
                  </Link>
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
