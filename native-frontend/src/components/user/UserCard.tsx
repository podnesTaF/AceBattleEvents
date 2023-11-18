import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  AvatarImage,
  Button,
  ButtonText,
  HStack,
  Heading,
  Pressable,
  VStack,
} from "@gluestack-ui/themed";
import { IRunner, IUser, RunnerPreview } from "@lib/models";
import { getCategoryByDoB } from "@lib/utils";
import { Link } from "expo-router";
import React from "react";

interface UserCardProps {
  user: IUser;
  runnerPreview?: IRunner | RunnerPreview;
  description?: string;
  isLastElement?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  runnerPreview,
  isLastElement,
  description,
}) => {
  const runner = user.runner || runnerPreview;
  return (
    <Link href={`/(modals)/(profile)/${user.id}`} asChild>
      <Pressable>
        {({ pressed }: { pressed: boolean }) => (
          <HStack
            opacity={pressed ? "$80" : "$100"}
            justifyContent="space-between"
            py={"$3"}
            borderBottomWidth={isLastElement ? 0 : 1}
            borderColor="$coolGray300"
          >
            <HStack space={"md"} alignItems="center">
              <Avatar bgColor="$blue400" size="md" borderRadius="$full">
                <AvatarImage
                  source={{
                    uri:
                      user.image?.mediaUrl ||
                      "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg",
                  }}
                  alt={"avatar"}
                />
              </Avatar>
              <VStack space="sm">
                <Heading size="sm">
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
                      : "no team"}
                  </Heading>
                )}
                {description && (
                  <Heading size={"xs"} color="$coolGray300">
                    {description}
                  </Heading>
                )}
              </VStack>
            </HStack>
            {runner && (
              <Button action="primary" variant="outline">
                <Ionicons name="person-add-outline" size={16} />
                <ButtonText ml={"$2"}>followi...</ButtonText>
              </Button>
            )}
          </HStack>
        )}
      </Pressable>
    </Link>
  );
};

export default UserCard;
