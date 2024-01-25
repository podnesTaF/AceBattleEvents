import UserCard from "@Components/user/UserCard";
import { Box, HStack, Heading, VStack } from "@gluestack-ui/themed";
import { IManager, IUser } from "@lib/models";
import React from "react";
import { useTranslation } from "react-i18next";

interface UserDetailedInfoProps {
  user: IUser;
  manager?: IManager;
}

const UserDetailedInfo: React.FC<UserDetailedInfoProps> = ({
  user,
  manager,
}) => {
  const { t } = useTranslation();
  return (
    <Box py={"$2"} width={"$full"}>
      <UserCard user={user} isLastElement={true} description={user.role} />
      <VStack width={"$2/3"} space={"lg"}>
        <HStack justifyContent="space-between" space="md">
          <Heading size={"md"} color="$coolGray400">
            {t("common.email")}:
          </Heading>
          <Heading size={"md"}>{user.email}</Heading>
        </HStack>
        {user.phone && (
          <HStack justifyContent="space-between" space="md">
            <Heading size={"md"} color="$coolGray400">
              {t("common.phone")}:
            </Heading>
            <Heading size={"md"}>{user.phone}</Heading>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default UserDetailedInfo;
