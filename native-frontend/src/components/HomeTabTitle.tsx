import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import { useAppSelector, useScreenSize } from "@lib/hooks";
import { IUser } from "@lib/models";
import { selectIsAuth } from "@lib/store";
import React from "react";
import Skeleton from "./common/states/Skeleton";
import Badge from "./custom/Badge";

const HomeTabTitle = ({
  user,
  annotation,
}: {
  user?: IUser | null;
  annotation?: string;
}) => {
  const isAuth = useAppSelector(selectIsAuth);
  const { isSmallScreen } = useScreenSize();

  return user ? (
    <HStack
      justifyContent="space-between"
      w={"$full"}
      space="md"
      alignItems="center"
    >
      <VStack justifyContent="center" space="xs"></VStack>
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
          bgColor="$red500"
        >
          <AvatarImage
            rounded={"$full"}
            source={{ uri: user.image?.mediaUrl }}
            alt={"avatar"}
          />
          <AvatarFallbackText>
            {user.name[0]} {user.surname[0]}
          </AvatarFallbackText>
        </Avatar>
      </HStack>
    </HStack>
  ) : isAuth === null ? (
    <Skeleton color={"#1c1e1f"} height={50} />
  ) : null;
};

export default HomeTabTitle;
