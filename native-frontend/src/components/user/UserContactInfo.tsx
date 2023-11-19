import { Heading, VStack } from "@gluestack-ui/themed";
import { IUser } from "@lib/models";
import React from "react";

const UserContactInfo = ({ user }: { user: IUser }) => {
  return (
    <VStack height={"auto"} space="md">
      <Heading mx={"$3"}>Contact info</Heading>
      <VStack
        space={"lg"}
        p="$4"
        borderLeftWidth={"$4"}
        bgColor={"$white"}
        borderColor="$red500"
      >
        <Heading>email: {user.email}</Heading>
        <Heading>phone: +32032219621</Heading>
      </VStack>
    </VStack>
  );
};

export default UserContactInfo;
