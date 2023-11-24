import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  HStack,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { INotification } from "@lib/models";
import { getTimeAgo } from "@lib/utils";
import React from "react";

interface NotificationItemProps {
  notification: INotification;
  pressed?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  pressed,
}) => {
  return (
    <HStack opacity={pressed ? 0.8 : 1} space={"lg"} alignItems="center">
      <Box
        width={"$4"}
        height={"$full"}
        borderTopRightRadius={50}
        borderBottomRightRadius={50}
        bg={notification.status === "unread" ? "$blue200" : "$coolGray200"}
      ></Box>
      {notification.sender?.image && (
        <Avatar size="lg" borderBottomRightRadius={50} bg={"transparent"}>
          <AvatarImage
            source={{
              uri: notification.sender?.image?.mediaUrl,
            }}
            alt="avatar"
            role={"img"}
          />
          <AvatarFallbackText>
            {notification?.sender?.name[0]}
            {notification?.sender?.surname[0]}
          </AvatarFallbackText>
        </Avatar>
      )}
      <HStack p={"$2"} flex={1} space={"sm"}>
        <VStack flex={1}>
          <Heading size={"sm"} numberOfLines={1}>
            {notification.title}
          </Heading>
          <Text size={"sm"} numberOfLines={1}>
            {notification.contents[0]?.text}
          </Text>
          <Text size={"sm"} color={"$coolGray300"}>
            {getTimeAgo(notification.createdAt)}
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};

export default NotificationItem;
