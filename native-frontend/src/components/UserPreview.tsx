import {
  Avatar,
  AvatarImage,
  HStack,
  Heading,
  Icon,
  VStack,
} from "@gluestack-ui/themed";
import { useScreenSize } from "@lib/hooks";
import { IUser } from "@lib/models";
import { User } from "lucide-react-native";
import React from "react";
import Badge from "./custom/Badge";

const UserPreview = ({
  user,
  annotation,
}: {
  user: IUser;
  annotation?: string;
}): JSX.Element => {
  const { isSmallScreen } = useScreenSize();

  return (
    <HStack
      justifyContent="flex-end"
      w={"$full"}
      space="md"
      alignItems="center"
    >
      <HStack space={"sm"} alignItems="center">
        <VStack space={"sm"}>
          <Heading
            py={"$0.5"}
            borderBottomColor="$white"
            borderBottomWidth={2}
            size={isSmallScreen ? "sm" : "md"}
            color="$white"
          >
            {user.name} {user.surname}
          </Heading>
          <HStack justifyContent="flex-end" space="xs">
            <Badge
              isActive={true}
              text={user.role}
              py={isSmallScreen ? "$0.5" : "$1"}
              px={isSmallScreen ? "$1" : "$2"}
            />
          </HStack>
        </VStack>
        <Avatar
          rounded={"$full"}
          size={isSmallScreen ? "md" : "lg"}
          bgColor="$black"
        >
          {user.image?.mediaUrl ? (
            <AvatarImage
              rounded={"$full"}
              source={{ uri: user.image?.mediaUrl }}
              alt={"avatar"}
            />
          ) : (
            <Icon as={User} color="white" size="xl" />
          )}
        </Avatar>
      </HStack>
    </HStack>
  );
};

export default UserPreview;
