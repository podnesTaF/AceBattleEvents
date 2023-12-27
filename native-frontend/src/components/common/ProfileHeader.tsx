import FollowButton from "@Components/user/FollowButton";
import { HStack, Heading, Image, VStack } from "@gluestack-ui/themed";
import { useAppSelector, useScreenSize } from "@lib/hooks";
import { IUser } from "@lib/models";
import { selectUser } from "@lib/store";
import React from "react";

interface ProfileHeaderProps {
  user: IUser;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const authed = useAppSelector(selectUser);
  const { isSmallScreen } = useScreenSize();

  return (
    <HStack
      justifyContent="space-between"
      w={"$full"}
      py={"$2"}
      px={"$4"}
      alignItems="center"
    >
      <HStack space={isSmallScreen ? "lg" : "xl"} alignItems="center">
        {user.image?.mediaUrl && (
          <Image
            source={{ uri: user.image.mediaUrl }}
            alt={"user avatar"}
            role={"img"}
            size={isSmallScreen ? "xs" : "sm"}
            rounded={"$full"}
          />
        )}
        <VStack space={isSmallScreen ? "xs" : "sm"} justifyContent="center">
          <Heading
            size={isSmallScreen ? "sm" : "md"}
            textTransform="capitalize"
            color={"$white"}
          >
            {user.name} {user.surname}
          </Heading>
          <Heading size={"xs"} color={"$red500"}>
            {user.role}
          </Heading>
        </VStack>
      </HStack>
      {authed && user.runner && (
        <FollowButton
          size={isSmallScreen ? "xs" : "sm"}
          userId={user.runner.id}
          isInitiallyFollowing={!!user.runner?.isFollowing}
        />
      )}
    </HStack>
  );
};

export default ProfileHeader;
