import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  HStack,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import { useAppSelector, useScreenSize } from "@lib/hooks";
import { IUser } from "@lib/models";
import { selectIsAuth } from "@lib/store";
import { scaleSize } from "@lib/utils";
import React from "react";
import withWatermarkBg from "./HOCs/withWatermark";
import Skeleton from "./common/states/Skeleton";
import Badge from "./custom/Badge";

const HomeTabTitle = ({
  user,
  annotation,
}: {
  user: IUser;
  annotation?: string;
}): JSX.Element => {
  const isAuth = useAppSelector(selectIsAuth);
  const { isSmallScreen } = useScreenSize();

  return (
    <Box
      alignItems="flex-end"
      pl={scaleSize(8)}
      pr={scaleSize(24)}
      py={scaleSize(20)}
      w={"$full"}
      gap={"$4"}
    >
      {user ? (
        <HStack
          flex={1}
          justifyContent="flex-end"
          w={"$full"}
          space="md"
          alignItems="center"
        >
          <HStack space={"sm"} alignItems="center">
            <VStack space={"sm"}>
              <Heading
                py={"$0.5"}
                borderBottomColor="$black"
                borderBottomWidth={2}
                size={isSmallScreen ? "sm" : "md"}
                color="$black"
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
      ) : null}
    </Box>
  );
};

export default withWatermarkBg(HomeTabTitle);
