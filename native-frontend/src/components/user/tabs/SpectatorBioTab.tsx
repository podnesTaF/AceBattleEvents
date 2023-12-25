import UserInfoList from "@Components/common/UserInfoList";
import { Image, VStack } from "@gluestack-ui/themed";
import { IUser } from "@lib/models";
import { getUsersInfo, scaleSize } from "@lib/utils";
import React from "react";
import UserContactInfo from "../UserContactInfo";

interface Props {
  user: IUser;
}

const SpectatorBioTab: React.FC<Props> = ({ user }) => {
  return (
    <VStack space="lg">
      <VStack>
        {user.image && (
          <Image
            role="img"
            source={{ uri: user.image.mediaUrl }}
            alt={"athlete large image"}
            size={"full"}
            height={scaleSize(210)}
          />
        )}
        <UserInfoList items={getUsersInfo(user)} />
      </VStack>
      <UserContactInfo user={user} />
    </VStack>
  );
};

export default SpectatorBioTab;
