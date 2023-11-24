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
      <Avatar size="md" bg={"transparent"}>
        <AvatarImage
          source={{
            uri:
              notification.sender?.image?.mediaUrl ||
              "https://storage.googleapis.com/abe_cloud_storage/image/large/55c30c67-37aa-4476-bae9-b6f847a707fd.png",
          }}
          alt="avatar"
          role={"img"}
        />
        <AvatarFallbackText>
          {notification?.sender?.name[0]}
          {notification?.sender?.surname[0]}
        </AvatarFallbackText>
      </Avatar>
      <HStack flex={1} space={"sm"}>
        <VStack flex={1}>
          <Heading size={"sm"}>{notification.title}</Heading>
          <Text size={"sm"}>
            {cutString(notification.contents[0]?.text || "", 50)}
          </Text>
        </VStack>
        <Text size={"sm"} color={"$coolGray300"}>
          {getTimeAgo(notification.createdAt)}
        </Text>
      </HStack>
    </HStack>
  );
};

export default NotificationItem;
