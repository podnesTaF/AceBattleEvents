import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "@gluestack-ui/themed";
import {
  useFollowRunnerMutation,
  useUnfollowRunnerMutation,
} from "@lib/services";

import React, { useState } from "react";

interface FollowButtonProps {
  userId: number;
  isInitiallyFollowing: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  color?: any;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  isInitiallyFollowing,
  size = "sm",
  color = "primary",
}) => {
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
  const [followRunner, { isLoading: isFollowingLoading }] =
    useFollowRunnerMutation();
  const [unfollowRunner, { isLoading: isUnfollowingLoading }] =
    useUnfollowRunnerMutation();

  const handleFollow = async () => {
    await followRunner(userId);
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    await unfollowRunner(userId);
    setIsFollowing(false);
  };

  return (
    <Button
      onPress={isFollowing ? handleUnfollow : handleFollow}
      disabled={isFollowing ? isUnfollowingLoading : isFollowingLoading}
      size={size}
      action={color}
      variant="outline"
    >
      <Ionicons
        name={isFollowing ? "person-remove-outline" : "person-add-outline"}
        size={16}
      />
      <ButtonText>{isFollowing ? "Unfollow" : "Follow"}</ButtonText>
    </Button>
  );
};

export default FollowButton;
