import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import { IUser } from "@lib/models";
import React from "react";
import Badge from "./custom/Badge";

const HomeTabTitle = ({
  user,
  annotation,
}: {
  user?: IUser | null;
  annotation?: string;
}) => {
  return (
    user && (
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
              size={"md"}
              color="$white"
            >
              {user.name} {user.surname}
            </Heading>
            <HStack justifyContent="flex-end" space="xs">
              <Badge isActive={true} text={user.role} py={"$1"} px={"$2"} />
            </HStack>
          </VStack>
          <Avatar rounded={"$full"} size="lg" bgColor="$red500">
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
    )
  );
};

export default HomeTabTitle;
