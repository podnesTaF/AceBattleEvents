import { Box, View, Image, Text,VStack, Heading, Center } from "@gluestack-ui/themed";
import React from "react";

interface AthletePodiumCardProps {
  user: any;
}

const AthletePodiumCard: React.FC<AthletePodiumCardProps> = ({ user }) => {
  return (
    <Center alignSelf={user.runner.rank === 2 ? "center" : user.runner.rank === 1 ? "flex-start" : "flex-end"}>
      <Box mb={"$1"} width={"$full"}>
        <Image
        role={"img"}
          source={{
            uri:
              user.image?.mediaUrl ||
              "https://storage.googleapis.com/abe_cloud_storage/image/large/69ab1b84-cb24-43fd-aa8e-2e9ca95d3df9.jpeg",
          }}
          alt={"avatar"}
          height={100}
          width={100}
          objectFit="cover"
          borderTopLeftRadius={20}
          borderBottomRightRadius={20}
        />
      </Box>
      <VStack alignItems="center" maxWidth={"$32"}>
          <Text fontWeight="600" size="lg" color={'$white'}>
            Rank {user.runner.rank}
          </Text>
          <Text size="md" color="$coolGray300" textAlign="center">
            {user.name} {user.surname}
          </Text>
      </VStack>
    </Center>
  );
};

export default AthletePodiumCard;
