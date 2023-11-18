import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  HStack,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import { IUser } from "@lib/models";
import React from "react";

interface ProfileHeaderProps {
  user: IUser;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <HStack
      justifyContent="space-between"
      w={"$full"}
      py={"$2"}
      px={"$4"}
      alignItems="center"
    >
      <HStack space="xl">
        <Avatar size={"md"} bgColor="$red500">
          <AvatarFallbackText>
            {user.name} {user.surname}
          </AvatarFallbackText>
          <AvatarImage
            source={{ uri: user.image?.mediaUrl }}
            alt={"user avatar"}
            role={"img"}
          />
        </Avatar>
        <VStack space="sm" justifyContent="center">
          <Heading size={"md"} color={"$white"}>
            {user.name} {user.surname}
          </Heading>
          <Heading size={"xs"} color={"$red500"}>
            {user.role}
          </Heading>
        </VStack>
      </HStack>
      {user.runner && (
        <Button action="positive" variant={"solid"}>
          <ButtonText>Follow</ButtonText>
        </Button>
      )}
    </HStack>
  );
};

export default ProfileHeader;
