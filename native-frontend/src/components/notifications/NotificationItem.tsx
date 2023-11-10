import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { INotification } from "@lib/models";
import { cutString, getTimeAgo } from "@lib/utils";
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
    <HStack
      opacity={pressed ? 0.8 : 1}
      py={"$1"}
      space={"lg"}
      alignItems="center"
    >
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
      <HStack flex={1} space={"sm"}>
        <VStack flex={1}>
          <Heading size={"sm"}>{notification.title}</Heading>
          <Text size={"sm"}>{cutString(notification.text, 50)}</Text>
        </VStack>
        <Text size={"sm"} color={"$coolGray300"}>
          {getTimeAgo(notification.createdAt)}
        </Text>
      </HStack>
    </HStack>
  );
};

export default NotificationItem;
