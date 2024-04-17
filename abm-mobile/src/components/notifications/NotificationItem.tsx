import { logoBlack } from "@Constants/cloud-images";
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
  isRead: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  pressed,
  isRead,
}) => {
  return (
    <HStack opacity={pressed ? 0.8 : 1} space={"sm"} alignItems="center">
      <Box
        width={"$4"}
        height={"$full"}
        borderTopRightRadius={50}
        borderBottomRightRadius={50}
        bg={isRead ? "$coolGray200" : "$blue200"}
      ></Box>
      <Avatar size="lg" borderBottomRightRadius={50} bg={"transparent"}>
        <AvatarImage
          source={{
            uri: notification.sender?.image?.mediaUrl || logoBlack,
          }}
          alt="avatar"
          role={"img"}
        />
        <AvatarFallbackText>
          {notification?.sender?.name[0]}
          {notification?.sender?.surname[0]}
        </AvatarFallbackText>
      </Avatar>
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
