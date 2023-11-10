import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonGroup,
  ButtonText,
  HStack,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { IUser } from "@lib/models";
import { Link } from "expo-router";
import React from "react";

const HomeTabTitle = ({
  user,
  annotation,
}: {
  user: IUser | null;
  annotation?: string;
}) => {
  return (
    <HStack
      justifyContent="space-between"
      w={"$full"}
      space="md"
      alignItems="center"
    >
      {user ? (
        <>
          <VStack justifyContent="center" space="xs">
            {annotation && (
              <Text color="$coolGray200" size="sm">
                {annotation}
              </Text>
            )}
            <Heading size={"md"} color="$white">
              {user.name} {user.surname}
            </Heading>
          </VStack>
          <Avatar rounded={"$md"} size="md" bgColor="$red500">
            <AvatarImage
              rounded={"$md"}
              source={{ uri: user.image?.mediaUrl }}
              alt={"avatar"}
            />
            <AvatarFallbackText>
              {user.name[0]} {user.surname[0]}
            </AvatarFallbackText>
          </Avatar>
        </>
      ) : (
        <ButtonGroup w={"$full"}>
          <Link href={"/(auth)/login"} asChild>
            <Button flex={1} variant="outline" action="positive">
              <ButtonText>Sign in</ButtonText>
            </Button>
          </Link>
          <Link href={"/(auth)/login"} asChild>
            <Button flex={1} variant="solid" action="positive">
              <ButtonText>Join us</ButtonText>
            </Button>
          </Link>
        </ButtonGroup>
      )}
    </HStack>
  );
};

export default HomeTabTitle;
