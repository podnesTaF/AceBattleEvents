import { Ionicons } from "@expo/vector-icons";
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
import { useAppSelector } from "@lib/hooks";
import { IUser } from "@lib/models";
import { useFollowRunnerMutation } from "@lib/services";
import { selectUser } from "@lib/store";
import React, { useState } from "react";

interface ProfileHeaderProps {
  user: IUser;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const authed = useAppSelector(selectUser);
  const [isFollowing, setIsFollowing] = useState(user.runner?.isFollowing);
  const [followRunner, { isLoading: isFollowingLoading }] =
    useFollowRunnerMutation();
  const [unfollowRunner, { isLoading: isUnfollowingLoading }] =
    useFollowRunnerMutation();

  const follow = async (id: number) => {
    await followRunner(id);
    setIsFollowing(true);
  };

  const unfollow = async (id: number) => {
    await unfollowRunner(id);
    setIsFollowing(false);
  };

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
      {authed &&
        user.runner &&
        (!isFollowing ? (
          <Button
            onPress={() => follow(user.runner!.id)}
            disabled={isFollowingLoading}
            size={"sm"}
            action="primary"
            variant="outline"
          >
            <Ionicons name="person-add-outline" size={16} />
            <ButtonText ml={"$2"}>Follow</ButtonText>
          </Button>
        ) : (
          <Button
            onPress={() => unfollow(user.runner!.id)}
            disabled={isUnfollowingLoading}
            size={"sm"}
            action="primary"
            variant="outline"
          >
            <Ionicons name="person-remove-outline" size={16} />
            <ButtonText ml={"$2"}>Unfoll..</ButtonText>
          </Button>
        ))}
    </HStack>
  );
};

export default ProfileHeader;
