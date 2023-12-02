import UserInfoList from "@Components/common/UserInfoList";
import UserContactInfo from "@Components/user/UserContactInfo";
import { Box, Image } from "@gluestack-ui/themed";
import { IUser } from "@lib/models";
import { getUsersInfo } from "@lib/utils";
import React from "react";

interface AthleteBioTabProps {
  user: IUser;
}

const AthleteBioTab = ({ user }: AthleteBioTabProps): JSX.Element => {
  return (
    <Box flex={1}>
      <Box mb={"$4"}>
        <Image
          role="img"
          source={{ uri: user.image?.mediaUrl }}
          alt={"athlete large image"}
          size={"full"}
          height={210}
        />
        <UserInfoList items={getUsersInfo(user)} />
      </Box>
      <UserContactInfo user={user} />
    </Box>
  );
};

export default AthleteBioTab;
