import { Heading, VStack } from "@gluestack-ui/themed";
import { useScreenSize } from "@lib/hooks";
import { IUser } from "@lib/models";
import React from "react";

const UserContactInfo = ({ user }: { user: IUser }) => {
  const { isSmallScreen } = useScreenSize();
  return (
    <VStack height={"auto"} space="md">
      <Heading mx={"$3"} size={isSmallScreen ? "sm" : "md"}>
        Contact info
      </Heading>
      <VStack
        space={"lg"}
        p="$4"
        borderLeftWidth={"$4"}
        bgColor={"$white"}
        borderColor="$red500"
      >
        <Heading size={isSmallScreen ? "sm" : "md"}>
          email: {user.email}
        </Heading>
        <Heading size={isSmallScreen ? "sm" : "md"}>
          phone: +32032219621
        </Heading>
      </VStack>
    </VStack>
  );
};

export default UserContactInfo;
