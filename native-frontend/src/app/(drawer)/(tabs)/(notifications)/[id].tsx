import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import CustomBackButton from "@Components/custom/CustomBackButton";
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
import { useGetNotificationQuery } from "@lib/notification/services";
import { getTimeAgo } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationScreen = () => {
  const { id } = useLocalSearchParams();

  const { data: notification, isLoading, error } = useGetNotificationQuery(+id);

  return (
    <>
      <Stack.Screen
        options={{
          header: ({ navigation }) => (
            <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
              <VStack
                alignItems="center"
                width={"100%"}
                space="md"
                top={"$4"}
                left={"$4"}
                pb={"$6"}
              >
                <HStack w={"$full"} alignItems="center">
                  <Box>
                    <CustomBackButton navigation={navigation} />
                  </Box>
                  <Box position="absolute" w={"100%"} alignItems="center">
                    <Heading size="sm" color={"$coolGray400"}>
                      Notification
                    </Heading>
                  </Box>
                </HStack>
                <WithLoading isLoading={isLoading}>
                  {notification && (
                    <HStack space="md" width={"95%"} alignItems="center">
                      <Avatar size="md" bg={"transparent"}>
                        <AvatarImage
                          source={{
                            uri:
                              notification?.sender?.image?.mediaUrl ||
                              logoWhite,
                          }}
                          alt="avatar"
                          role={"img"}
                        />
                      </Avatar>
                      <VStack flex={1}>
                        <Heading size={"sm"} color={"#fff"}>
                          {notification.title}
                        </Heading>
                      </VStack>
                    </HStack>
                  )}
                </WithLoading>
              </VStack>
            </SafeAreaView>
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
