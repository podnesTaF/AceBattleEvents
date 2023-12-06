import FollowButton from "@Components/user/FollowButton";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { IUser } from "@lib/models";
import { selectUser } from "@lib/store";
import React from "react";

interface ProfileHeaderProps {
  user: IUser;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const authed = useAppSelector(selectUser);

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
          {user.image?.mediaUrl && (
            <AvatarImage
              source={{ uri: user.image.mediaUrl }}
              alt={"user avatar"}
              role={"img"}
            />
          )}
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
      {authed && user.runner && (
        <FollowButton
          userId={user.runner.id}
          isInitiallyFollowing={!!user.runner?.isFollowing}
          size="md"
        />
      )}
    </HStack>
  );
};

export default ProfileHeader;
