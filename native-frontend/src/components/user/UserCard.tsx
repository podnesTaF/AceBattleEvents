import { logoBlack } from "@Constants/cloud-images";
import {
  Avatar,
  AvatarImage,
  HStack,
  Heading,
  Pressable,
  VStack,
} from "@gluestack-ui/themed";
import { useScreenSize } from "@lib/hooks";
import { IRunner, IUser, RunnerPreview } from "@lib/models";
import { getCategoryByDoB } from "@lib/utils";
import { Link } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import FollowButton from "./FollowButton";

interface UserCardProps {
  user: IUser;
  runnerPreview?: IRunner | RunnerPreview;
  description?: string;
  isLastElement?: boolean;
  isAuthorized?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  runnerPreview,
  isLastElement,
  description,
  isAuthorized,
}) => {
  const runner = user?.runner || runnerPreview;
  const { isSmallScreen } = useScreenSize();
  const { t } = useTranslation();

  if (!user && !runner) {
    return null;
  }

  return (
    <Link href={`/(modals)/(profile)/${user.id}`} asChild>
      <Pressable>
        {({ pressed }: { pressed: boolean }) => (
          <HStack
            opacity={pressed ? "$80" : "$100"}
            justifyContent="space-between"
            alignItems="center"
            py={"$3"}
            borderBottomWidth={isLastElement ? 0 : 1}
            borderColor="$coolGray300"
          >
            <HStack space={"md"} alignItems="center">
              <Avatar bgColor="$white" size="md" borderRadius="$full">
                <AvatarImage
                  source={{
                    uri: user.image?.mediaUrl || logoBlack,
                  }}
                  alt={"avatar"}
                />
              </Avatar>
              <VStack space="sm">
                <Heading size="sm" textTransform="capitalize">
                  {user.name} {user.surname}
                </Heading>
                {runner && (
                  <Heading size={"xs"} color="$coolGray300">
                    {getCategoryByDoB(
                      runner?.dateOfBirth || runner.dateOfBirth
                    )}{" "}
                    |{" "}
                    {runner.teamsAsRunner?.length
                      ? runner.teamsAsRunner[0].name
                      : t("common.noTeam")}
                  </Heading>
                )}
                {description && (
                  <Heading size={"xs"} color="$coolGray300">
                    {description}
                  </Heading>
                )}
              </VStack>
            </HStack>
            {isAuthorized && runner && (
              <FollowButton
                isInitiallyFollowing={!!runner?.isFollowing}
                size={isSmallScreen ? "xs" : "sm"}
                color="primary"
                userId={runner.id}
              />
            )}
          </HStack>
        )}
      </Pressable>
    </Link>
  );
};

export default UserCard;
