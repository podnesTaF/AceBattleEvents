import UserInfoList from "@Components/common/UserInfoList";
import UserContactInfo from "@Components/user/UserContactInfo";
import { Box } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { IUser } from "@lib/models";
import { selectUser } from "@lib/store";
import { getUsersInfo } from "@lib/utils";
import { Image } from "expo-image";
import React from "react";

interface AthleteBioTabProps {
  user: IUser;
}

const AthleteBioTab = ({ user }: AthleteBioTabProps): JSX.Element => {
  const authedUser = useAppSelector(selectUser);
  return (
    <Box>
      <Box mb={"$4"} overflow="hidden">
        <Box height={"auto"}>
          {user.image && (
            <Image
              style={{
                width: "100%",
                height: 260,
              }}
              source={{ uri: user.image.mediaUrl }}
              alt={"athlete large image"}
              contentFit="contain"
            />
          )}
        </Box>
        <Box flex={1}>
          <UserInfoList items={getUsersInfo(user)} />
        </Box>
      </Box>
      {authedUser?.id === user.id ||
        (authedUser?.role === "manager" && <UserContactInfo user={user} />)}
    </Box>
  );
};

export default AthleteBioTab;
